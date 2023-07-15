import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const useRefreshToken = (clientId, clientSecret) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('token_expiration'));

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!accessToken || !tokenExpiration) {
        return;
      }

      const expirationTime = dayjs(tokenExpiration);
      const currentTime = dayjs();

      if (currentTime >= expirationTime) {
        refreshAccessToken();
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await fetch('https://your-token-endpoint.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
          },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });

        const data = await response.json();
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setTokenExpiration(data.expires_in);
        
        // store the new token and expiration time in local storage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_expiration', data.expires_in);
        
      } catch (err) {
        console.error(err);
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [accessToken, refreshToken, tokenExpiration, clientId, clientSecret]);

  return accessToken;
};
export default useRefreshToken;