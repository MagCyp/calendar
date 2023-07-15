import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, styled, TextField } from '@mui/material';
import PickDate from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import addEvent from '../../services/addEvent';

const names = {
  'Oliver': { hours: 1, minutes: 30 },
  'Name': { hours: 0, minutes: 45 },
  'Judi': { hours: 0, minutes: 30 }
};

const TextFieldStyle = styled(TextField)({
  '@media screen and (max-width:555px)':{
    margin: '100px'
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
})

export default function MyForm() {
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
  //розібратись куди зберігати токен, і зробити норм сторінку для логіна якщо треба буде все ж
  return (
    <Box sx={{
      backgroundColor: '#ddddd5',
      width: '55vh',
      margin: 'auto',
      borderRadius: '30px',
      border: '6px solid #7e7e67',
      padding: '50px 40px 40px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      '& .MuiFormControl-root': {
        marginTop: '15px',
      },
      '& .MuiPopover-root': {
        backgroundColor: 'ffffff'
      },
      '@media (max-width: 555px)': {
        width: '100%',
        margin: 'auto',
        marginTop: '0px',
        height: '80vh',
        '& .MuiFormControl-root': {
          margin: '20px',
          marginRight: '0px',
          marginLeft: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
        },
      },
    }}>
      <TextFieldStyle
        label={firstName.length > 0 ? "Name" : "Please enter name..."}
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextFieldStyle
        label={lastName.length > 0 ? "Last Name" : "Please enter last name..."}
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextFieldStyle
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
        >
          {Object.keys(names).map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
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
          backgroundColor: '#afaf9d',
          width: '10vh',
          margin: 'auto',
          mt: '10px',
          border: '1px solid ',
          borderRadius: '15px',
          color: 'black',
        }}
      >
        Add
      </Button>
    </Box>
  );
}