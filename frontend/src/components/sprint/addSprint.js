import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SPRINT } from "../../graphql/sprint";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddSprint = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const [createSprint, { data, loading, error }] = useMutation(CREATE_SPRINT);
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
  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Creating Sprints..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Sprint creation error! ${error.message}`
      </Typography>
    );
  console.log(data);

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
      <Stack spacing={2} sx={{ my: 3, width: "50%" }}>
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
