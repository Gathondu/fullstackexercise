import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SPRINT } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@mui/material";
import SprintTickets from "./tickets";
import AddSprint from "./addSprint";

const Sprint = () => {
  const { sprintId: id } = useParams();
  const { data, loading, error } = useQuery(GET_SPRINT, { variables: { id } });
  const [viewTickets, setViewTickets] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading Sprint..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Fetch error! ${error.message}`
      </Typography>
    );

  const { name, points, tickets } = data.sprint;

  return (
    <div>
      {isEditing ? (
        <AddSprint sprint={data.sprint} isEditing setIsEditing={setIsEditing} />
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Points: {points}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Tickets: {tickets.length > 0 ? tickets.length : "None"}
          </Typography>
        </>
      )}
      {!isEditing && (
        <Button onClick={() => setIsEditing(true)}>Edit Sprint</Button>
      )}
      {tickets.length > 0 && (
        <Button onClick={() => setViewTickets(!viewTickets)}>
          {!viewTickets ? "View Tickets" : "Hide Tickets"}
        </Button>
      )}
      {viewTickets && <SprintTickets tickets={tickets} />}
    </div>
  );
};

export default Sprint;
