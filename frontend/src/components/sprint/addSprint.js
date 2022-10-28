import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_SPRINT } from "../../graphql/sprint";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ArrowBackOutlined } from "@mui/icons-material";

const AddSprint = ({
  sprint = {},
  isEditing = false,
  setIsEditing = () => {},
}) => {
  const [name, setName] = useState(sprint.name || "");
  const [startDate, setStartDate] = useState(sprint.startDate || dayjs());
  const [endDate, setEndDate] = useState(sprint.endDate || dayjs());
  const navigate = useNavigate();
  const { sprintId } = useParams();

  const [createSprint, { loading, error }] = useMutation(CREATE_SPRINT, {
    onCompleted: () => {
      isEditing ? navigate(`/sprint/${sprintId}`) : navigate("/sprints");
      setIsEditing(false);
    },
    refetchQueries: ["sprints"],
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
        "Loading..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Sprint Error! ${error.message}`
      </Typography>
    );

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/sprints")}
      >
        Back to Sprints
      </Button>
      <form
        onSubmit={handleSubmit}
        style={{
          paddingLeft: "12rem",
          marginBottom: isEditing ? "2rem" : 0,
        }}
      >
        <Typography sx={{ mt: 3, mb: 3 }} variant="h4">
          {isEditing ? "Edit Sprint" : "New Sprint"}
        </Typography>
        <TextField
          required
          sx={{ width: "60%" }}
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Stack spacing={2} sx={{ my: 3, width: "60%" }}>
          <DatePicker
            required
            disablePast
            minDate="1"
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(dayjs(newValue))}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            required
            disablePast
            minDate="1"
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(dayjs(newValue))}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Edit" : "Submit"}
        </Button>
        {isEditing && (
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        )}
      </form>
    </>
  );
};

export default AddSprint;
