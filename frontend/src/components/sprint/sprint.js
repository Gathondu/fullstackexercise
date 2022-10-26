import React from "react";
import { useParams } from "react-router-dom";
import { GET_SPRINT } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";

const Sprint = () => {
  const { sprintId: id } = useParams();
  const { data, loading, error } = useQuery(GET_SPRINT, { variables: { id } });

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading Sprints..."
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
    </div>
  );
};

export default Sprint;
