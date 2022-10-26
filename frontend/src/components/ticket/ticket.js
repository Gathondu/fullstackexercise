import React from "react";
import { useParams } from "react-router-dom";
import { GET_TICKET } from "../../graphql/ticket";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";

const Ticket = () => {
  const { ticketId: id } = useParams();
  const { data, loading, error } = useQuery(GET_TICKET, { variables: { id } });

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading Ticket..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Fetch error! ${error.message}`
      </Typography>
    );

  const { name, points, description } = data.ticket;

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        Name: {name}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Description: {description}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        Points: {points}
      </Typography>
    </div>
  );
};

export default Ticket;
