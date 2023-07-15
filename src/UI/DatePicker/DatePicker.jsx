import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { gapi } from 'gapi-script';
import { React, useEffect, useState } from 'react';

const style = {
  "& .MuiCalendarPicker-root": {
    '*::WebkitScrollbar': {
      width: '0.4em'
    },
    '*::WebkitScrollbarTrack': {
      'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::WebkitScrollbarThumb': {
      backgroundColor: 'red',
      outline: '1px solid slategrey'
    }
  },
  "& .MuiPaper-root": {
    border: "1px solid black",
  },
  "& .MuiPickersFadeTransitionGroup-root": {
    "& .MuiButtonBase-root": {
      backgroundColor: 'rgba(61, 155, 55, 0.99)',
    },
    " & .Mui-disabled": {
      backgroundColor: "rgba(209, 216, 208, 0.99)"
    },
  },
}

export default function PickDate({ onChange, a }) {
  const [date, setValue] = useState(dayjs());
  const [events, setEvents] = useState([]);

  const hoursBefore = a.hours;
  const minutesBefore = a.minutes;

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    gapi.load("client", function () {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            console.log("Error: " + err);
          }
        );
    });
  }, [apiKey, calendarID]);

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

  const getEventTime = (i) => {
    return dayjs(events[i].end.dateTime).$H - dayjs(events[i].start.dateTime).$H;
  }

  const countHoursInDays = () => {
    let hoursInDay = {};
    for (let i = 0; i < events.length; i++) {
      let hours = getEventTime(i);
      let key = dayjs(events[i].start.dateTime).$D + "-" + dayjs(events[i].start.dateTime).$M + "-" + dayjs(events[i].start.dateTime).$y;
      if (hoursInDay[key] === undefined) {
        hoursInDay[key] =
        {
          hours: hours,
          day: dayjs(events[i].start.dateTime).$D,
          month: dayjs(events[i].start.dateTime).$M,
          year: dayjs(events[i].start.dateTime).$y,
        };
      }
      else {
        hoursInDay[key].hours += hours;
      }
    }
    return hoursInDay;
  }

  const disabledDays = (hoursInDay) => {
    let days = [];
    for (let key in hoursInDay) {
      if (hoursInDay[key].hours + hoursBefore > 15) {
        days.push(`${hoursInDay[key].year}-${hoursInDay[key].month + 1}-${hoursInDay[key].day}`);
      }
    }
    return days;
  }

  const disabledHours = () => {
    let hour = [];
    let filteredEvents = events.filter(event => {
      return dayjs(event.start.dateTime).isSame(date, 'date');
    });

    filteredEvents.sort((a, b) => {
      return dayjs(a.start.dateTime).hour() - dayjs(b.start.dateTime).hour();
    });

    filteredEvents.forEach((event) => {
      let start = dayjs(event.start.dateTime).hour() + 1;
      let end = dayjs(event.end.dateTime).hour();
      hour.push(...Array.from({ length: end - start }, (_, j) => start + j));
    });

    for (let i = 0; i <= filteredEvents.length - 1; i++) {
      let startHour = dayjs(filteredEvents[i].start.dateTime).hour();
      let startAfterSubtract = dayjs(filteredEvents[i].start.dateTime).subtract(hoursBefore, 'hour').subtract(minutesBefore, 'minute');
      if (startAfterSubtract.minute() === 0) {
        for (let j = startHour; j >= startAfterSubtract.hour(); j--) {
          hour.push(j);
        }
      }
      else {
        for (let j = startHour; j > startAfterSubtract.hour(); j--) {
          hour.push(j);
        }
      }
    }
    return hour;
  }

  const disabledMinutes = () => {
    let minutes = [];
    let filteredEvents = events.filter(event => {
      return dayjs(event.start.dateTime).isSame(date, 'date');
    });
    filteredEvents.sort((a, b) => {
      return dayjs(a.start.dateTime).hour() - dayjs(b.start.dateTime).hour();
    });
    for (let ev of filteredEvents) {
      if (dayjs(ev.start.dateTime).format('DD/MM/YYYY') === date.format('DD/MM/YYYY')
        && dayjs(ev.end.dateTime).hour() === date.hour()) {
        minutes.push(0);
        minutes.push(dayjs(ev.end.dateTime).$m);
      }
      if (dayjs(ev.start.dateTime).format('DD/MM/YYYY') === date.format('DD/MM/YYYY')
        && dayjs(ev.start.dateTime).subtract(hoursBefore, 'hour').subtract(minutesBefore, 'minute').hour() === date.hour()) {
        minutes.push(dayjs(ev.start.dateTime).subtract(minutesBefore, 'minute').minute());
        minutes.push(59);
      }
    }
    // блокує в кінці, ще треба зробити блок для a
    return minutes;
  }

  const filler = (dates) => {
    let filled = [...dates];
    for (let i = 0; i < dates.length - 1; i += 2) {
      let start = dates[i];
      let end = dates[i + 1];
      for (let j = start + 1; j < end; j++) {
        filled.push(j);
      }
    }
    return filled;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        am={false}
        ampm={false}
        ampmInClock={false}
        // minTime={dayjs().set('hour', 10)}
        // maxTime={dayjs().set('hour', 19)}
        disablePast={true}
        label="Date&Time picker"
        value={date}
        onChange={handleChange}
        disabled={(a.hours === 0 || a.hours === undefined) && (a.minutes === 0 || a.minutes === undefined)}
        shouldDisableDate={(date) =>
          disabledDays(countHoursInDays()).filter(disabledDate => dayjs(date).isSame(dayjs(disabledDate), 'date')).length > 0}        // shouldDisableTime={(timeValue, clockType) => {
        shouldDisableTime={(timeValue, clockType) => {
          return (
            (clockType === "minutes" && filler(disabledMinutes()).includes(timeValue))
            || (clockType === "hours" && disabledHours().includes(timeValue))
          )
        }}
        PopperProps={{
          sx: style
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
