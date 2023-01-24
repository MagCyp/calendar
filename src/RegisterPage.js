import { Container } from "@mui/material";
import { gapi } from "gapi-script";
import { useState } from "react";
import MyForm from "./UI/Form/Form";
import { TopBar } from "./UI/TopBar/TopBar";

export default function RegisterPage() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    gapi.load('client:auth2', () => {
        gapi.client.init({
            clientId: '992620281179-aundf5a1me4rtbl3gp2nik60vbbbjhr5.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/calendar'
        }).then(() => {
            let auth = gapi.auth2.getAuthInstance();
            window.localStorage.setItem('ACCESS_TOKEN', (auth.currentUser.get().xc.access_token));
            setIsSignedIn(true)
        });
    });
    if (!isSignedIn) {
        const handleAuthClick = () => {
            gapi.auth2.getAuthInstance().signIn();
        };
    
        const handleSignoutClick = () => {
            gapi.auth2.getAuthInstance().signOut();
        };
        return (
            <div>
                <button onClick={handleAuthClick} disabled={isSignedIn}>Sign In</button>
                <button onClick={handleSignoutClick} disabled={!isSignedIn}>Sign Out</button>
            </div>
        )
    }
    else {
        const ACCESS_TOKEN = window.localStorage.getItem('ACCESS_TOKEN');
        return (
            <div style={{
                backgroundColor: '#8181e4',
                height: '100vh',
            }}>
                <TopBar />
                <Container sx={{ pt: 10 }}>
                    <MyForm token={ACCESS_TOKEN} />
                </Container>
            </div>
        )
    }
}