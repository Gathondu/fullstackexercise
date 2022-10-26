import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SPRINT, GET_SPRINTS } from "../../graphql/sprint";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddSprint = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const [createSprint] = useMutation(CREATE_SPRINT, {
    refetchQueries: [{ query: GET_SPRINTS }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createSprint({
      variables: {
        name,
        startDate,
        endDate,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ m: 3 }}>New Sprint</Typography>
      <TextField
        id="standard-basic"
        required
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Stack spacing={2} sx={{ my: 3 }}>
        <DatePicker
          required
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(dayjs(newValue))}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          required
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(dayjs(newValue))}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddSprint;
