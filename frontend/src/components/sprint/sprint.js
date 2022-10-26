import React from "react";
import { useParams } from "react-router-dom";
import { GET_SPRINT } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@mui/material";

const Sprint = () => {
  const { sprintId: id } = useParams();
  const { data, loading, error } = useQuery(GET_SPRINT, { variables: { id } });

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
      <Typography gutterBottom variant="h5" component="div">
        Name: {name}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Points: {points}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Tickets: {tickets.length > 0 ? tickets.length : "None"}
      </Typography>
      {tickets.length > 0 && (
        <Button href={`/sprint/${id}/tickets`}>View Tickets in Sprint</Button>
      )}
    </div>
  );
};

export default Sprint;
