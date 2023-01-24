import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import PickDate from '../DatePicker/DatePicker';
import { gapi } from 'gapi-script';
import dayjs from 'dayjs';

const names = {
  'Oliver': { hours: 1, minutes: 30 },
  'Name': { hours: 0, minutes: 45 },
  'Judi': { hours: 0, minutes: 30 }
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function MyForm(token) {
  const [firstName, setFirstName] = useState('1');
  const [lastName, setLastName] = useState('1');
  const [mobileNumber, setMobileNumber] = useState('1');
  const [date, setDate] = useState(dayjs());
  const [personName, setPersonName] = useState([]);
  let [a, setA] = useState(0);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    let a = { hours: 0, minutes: 0 };
    value.forEach(element => {
      a.hours += names[element].hours;
      a.minutes += names[element].minutes;
    });
    setA({ hours: a.hours + Math.floor(a.minutes / 60), minutes: a.minutes % 60 });
  }

  const addEvent = (event) => {
    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/dimares53@gmail.com/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
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
    console.log("event added")
  };

  //2023-01-18T09:00:00-02:00
  var eventPattern = {
    summary: `name:${firstName}, lastName:${lastName}, number:${mobileNumber}, todo:${personName}`,
    start: {
      dateTime: `${date.$y}-${date.$M + 1}-${date.$D}T${date.$H}:${date.minute()}:00`,
      timeZone: 'Europe/Rome',
    },
    end: {
      dateTime: `${date.$y}-${date.$M + 1}-${date.$D}T${date.$H + a.hours + Math.floor(a.minutes / 60)}:${(date.$m + a.minutes) % 60}:00`,
      timeZone: 'Europe/Rome',
    },
  };
  //доробити батон, те що текст виходить за межі інпутів, та нормально застайлити календар
  //розібратись куди зберігати токен, і зробити норм сторінку для логіна якщо треба буде все ж
  return (
    <Box sx={{
      backgroundColor: '#7575f0',
      width: '55vh',
      margin: 'auto',
      borderRadius: '30px',
      border: '6px solid #6666ff',
      padding: '50px 40px 40px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      '& .MuiFormControl-root': {
        marginTop: '15px',
      },
      '& .MuiPopover-root': {
        backgroundColor: 'ffffff'
      }
    }}>
      <TextField
        label={firstName.length > 0 ? "Name" : "Please enter name..."}
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label={lastName.length > 0 ? "Last Name" : "Please enter last name..."}
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label={mobileNumber.length > 0 ? "Mobile Number" : "Please enter mobile number..."}
        value={mobileNumber}
        onChange={e => setMobileNumber(e.target.value)}
      />
      {/* <Box className='MuiFormControl-root'> */}
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {Object.keys(names).map((name) => (
            <MenuItem key={name} value={name} sx={{ backgroundColor: '#7575f0' }}>
              <Checkbox checked={personName.indexOf(name) > -1} sx={{ backgroundColor: '#7575f0' }} />
              <ListItemText primary={name} sx={{ backgroundColor: '#7575f0' }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* </Box> */}
      <PickDate onChange={handleDateChange} a={a} />
      <Button
        onClick={() => addEvent(eventPattern)}
        disabled={!firstName || !lastName || !mobileNumber || personName.length <= 0}
        sx={{
          backgroundColor: '#668cff',
          width: '10vh',
          margin: 'auto',
          mt: '10px',
          border: '1px solid ',
          borderRadius: '15px',
        }}
      >
        Add
      </Button>
    </Box>
  );
}