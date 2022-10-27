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
} from "@mui/material";

const AddTicket = ({ ticket = {}, isEditing = false }) => {
  const [name, setName] = useState(ticket.name || "");
  const [description, setDescription] = useState(ticket.description || "");
  const [points, setPoints] = useState(ticket.points || 0);
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, {
    onCompleted: () => navigate("/tickets"),
  });

  const {
    data,
    loading: sprintsLoading,
    error: sprintsError,
  } = useQuery(GET_SPRINTS);
  const [sprints, setSprints] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!sprintsLoading && !sprintsError) {
      setSprints(
        data.sprints.map((sprint) => ({ name: sprint.name, value: sprint.id }))
      );
      setSelected(data.sprints[0].id);
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
      <Typography gutterBottom variant="h5" component="div">
        "Creating Ticket..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Ticket creation error! ${error.message}`
      </Typography>
    );

  return (
    <>
      {!isEditing && (
        <Button onClick={() => navigate("/tickets")}>back to tickets</Button>
      )}
      <form onSubmit={handleSubmit}>
        <Typography sx={{ m: 3 }}>
          {isEditing ? "Edit Ticket" : "New Ticket"}
        </Typography>
        <FormGroup sx={{ mb: 3, width: "50%" }}>
          <TextField
            id="standard-basic"
            required
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={description}
            variant="standard"
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
          {isEditing ? "Edit" : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default AddTicket;
