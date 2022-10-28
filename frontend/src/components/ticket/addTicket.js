import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TICKET } from "../../graphql/ticket";
import { GET_SPRINTS } from "../../graphql/sprint";
import {
  TextField,
  Typography,
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

const AddTicket = ({
  ticket = {},
  isEditing = false,
  setIsEditing = () => {},
}) => {
  const [name, setName] = useState(ticket.name || "");
  const [description, setDescription] = useState(ticket.description || "");
  const [points, setPoints] = useState(ticket.points || 0);
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, {
    onCompleted: () => {
      isEditing ? navigate(`/ticket/${ticketId}`) : navigate("/tickets");
      setIsEditing(false);
    },
    refetchQueries: ["tickets", "sprints", "unassingedTickets"],
  });

  const {
    data,
    loading: sprintsLoading,
    error: sprintsError,
  } = useQuery(GET_SPRINTS);
  const [sprints, setSprints] = useState([]);
  const [selected, setSelected] = useState(ticket?.sprint?.id || "");

  useEffect(() => {
    if (!sprintsLoading && !sprintsError) {
      setSprints(
        data.sprints.map((sprint) => ({ name: sprint.name, value: sprint.id }))
      );
    }
  }, [data, sprintsLoading, sprintsError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket({
      variables: {
        name,
        description,
        points,
        sprintId: selected,
        ticketId,
      },
    });
  };

  if (loading)
    return (
      <Stack
        sx={{ color: "grey.500", paddingLeft: "5rem" }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </Stack>
    );
  if (error)
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Stack>
    );

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/tickets")}
      >
        back to tickets
      </Button>
      <form
        onSubmit={handleSubmit}
        style={{
          paddingLeft: "12rem",
        }}
      >
        <Typography sx={{ mt: 3, mb: 3 }} variant="h4">
          {isEditing ? "Edit Ticket" : "New Ticket"}
        </Typography>
        <FormGroup sx={{ mb: 2, width: "60%" }}>
          <TextField
            sx={{ mb: 2 }}
            required
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="number"
            label="Points"
            defaultValue={points}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
          <FormControl sx={{ mt: 4 }}>
            <InputLabel htmlFor="agent-simple">Sprint</InputLabel>
            <Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              inputProps={{
                name: "sprint",
              }}
            >
              {sprints.map((sprint) => {
                return (
                  <MenuItem key={sprint.value} value={sprint.value}>
                    {sprint.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Save" : "Submit"}
        </Button>
        {isEditing && (
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        )}
      </form>
    </>
  );
};

export default AddTicket;
