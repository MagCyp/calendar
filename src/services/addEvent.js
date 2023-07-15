import { gapi } from "gapi-script"; 

const addEvent = (event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/dimares53@gmail.com/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem('ACCESS_TOKEN')}`,
          },
        })
        .then(
          (response) => {
            return [true, response];
          },
          function (err) {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };
export default addEvent;