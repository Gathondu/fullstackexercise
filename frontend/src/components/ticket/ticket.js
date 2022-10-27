import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_TICKET } from "../../graphql/ticket";
import { useQuery } from "@apollo/client";
import { Typography, Button } from "@mui/material";
import AddTicket from "./addTicket";
import TicketSprint from "./sprint";

const Ticket = () => {
  const { ticketId: id } = useParams();
  const { data, loading, error } = useQuery(GET_TICKET, { variables: { id } });
  const [isEditing, setIsEditing] = useState(false);
  const [viewSprint, setViewSprint] = useState(false);
  const navigate = useNavigate();

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

  return isEditing ? (
    <AddTicket ticket={data.ticket} isEditing />
  ) : (
    <>
      <Button onClick={() => navigate("/tickets")}>back to tickets</Button>
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
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <Button onClick={() => setViewSprint(!viewSprint)}>
        {viewSprint ? "Hide Sprint" : "View Sprint"}
      </Button>
      {viewSprint && <TicketSprint sprint={data.ticket.sprint} />}
    </>
  );
};

export default Ticket;
