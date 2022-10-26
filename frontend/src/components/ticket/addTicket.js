import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TICKET } from "../../graphql/ticket";
import { TextField, Typography, Button, FormGroup } from "@mui/material";

const AddTicket = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);

  const [createTicket, { loading, error }] = useMutation(CREATE_TICKET);
  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket({
      variables: {
        name,
        description,
        points,
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
    <form onSubmit={handleSubmit}>
      <Typography sx={{ m: 3 }}>New Ticket</Typography>
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
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddTicket;
