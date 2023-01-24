import React from "react";
import { TopBar } from "./UI/TopBar/TopBar";
import style from './App.module.scss';
import { Button, Grid, styled, Container } from "@mui/material";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Home() {

  // const [events, setEvents] = useState([]);

  // const calendarID = process.env.REACT_APP_CALENDAR_ID;
  // const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // const getEvents = (calendarID, apiKey) => {
  //   function initiate() {
  //     gapi.client
  //       .init({
  //         apiKey: apiKey,
  //       })
  //       .then(function () {
  //         return gapi.client.request({
  //           path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
  //         });
  //       })
  //       .then(
  //         (response) => {
  //           let events = response.result.items;
  //           setEvents(events);
  //         },
  //         function (err) {
  //           return [false, err];
  //         }
  //       );
  //   }
  //   gapi.load("client", initiate);
  // };

  // useEffect(() => {
  //   const events = getEvents(calendarID, apiKey);
  //   setEvents(events);
  // }, [apiKey, calendarID]);

  return (
    <div className={style.mainDiv}>
      <TopBar />
      <Container maxWidth="lg" sx={{ pl: 1, pr: 1, pt: 0, mt: 0, height: 'calc(100vh - 35px)', backgroundColor: "green" }}>
        <Grid container spacing={2} sx={{ pt: 3, pl: 10, pr: 5 }}>
          <Grid item xs={8}>
            Nails play a vital role in construction and carpentry,
            allowing materials to be fastened together securely.
            They are available in different shapes and sizes,
            with steel being the most common type of nail.
            Nail care is an essential part of personal grooming and a healthy lifestyle.
            Regular clipping, filing,
            and polishing of nails can prevent fungal infections and other issues.
            Nail salons offer professional nail care services, including manicures and pedicures,
            providing a relaxing and enjoyable experience. Overall,
            nails are a small but significant aspect of our daily lives.
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button>Register me</Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Img src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png" alt="1" sx={{ height: 150, pt: 0 }} />
          </Grid>
        </Grid>

        {/* <table>
          <tbody>
            {events?.map((event) => (
              <tr key={event.id}>
                <td>date start: {(event.start.dateTime)}</td>
                <td>date end: {(event.end.dateTime)}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </Container>
    </div>
  );
}

