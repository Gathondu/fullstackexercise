import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_SPRINT } from "../../graphql/sprint";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddSprint = ({ sprint = {}, isEditing = false }) => {
  const [name, setName] = useState(sprint.name || "");
  const [startDate, setStartDate] = useState(sprint.startDate || dayjs());
  const [endDate, setEndDate] = useState(sprint.endDate || dayjs());
  const navigate = useNavigate();

  const [createSprint, { loading, error }] = useMutation(CREATE_SPRINT, {
    onCompleted: () => navigate("/sprints"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createSprint({
      variables: {
        name,
        startDate,
        endDate,
        id: sprint.id,
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

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ m: 3 }}>
        {isEditing ? "Edit Sprint" : "New Sprint"}
      </Typography>
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
        {isEditing ? "Edit" : "Submit"}
      </Button>
    </form>
  );
};

export default AddSprint;
