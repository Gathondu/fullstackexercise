import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_TICKET, DELETE_TICKET } from "../../graphql/ticket";
import { useQuery, useMutation } from "@apollo/client";
import { Typography, Button, CardContent } from "@mui/material";
import AddTicket from "./addTicket";
import TicketSprint from "./sprint";
import {
  ModeEditOutline,
  DeleteOutline,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";

const Ticket = () => {
  const { ticketId: id } = useParams();
  const { data, loading, error } = useQuery(GET_TICKET, { variables: { id } });
  const [isEditing, setIsEditing] = useState(false);
  const [viewSprint, setViewSprint] = useState(false);
  const navigate = useNavigate();
  const [deleteTicket] = useMutation(DELETE_TICKET, {
    onCompleted: () => navigate("/tickets"),
    refetchQueries: ["tickets"],
  });

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading..."
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
    <AddTicket ticket={data.ticket} isEditing setIsEditing={setIsEditing} />
  ) : (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/tickets")}
      >
        back to tickets
      </Button>
      <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Description: {description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Points: {points}
          </Typography>
        </CardContent>
      </div>
      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        startIcon={<ModeEditOutline />}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        onClick={() => deleteTicket({ variables: { id } })}
        startIcon={<DeleteOutline />}
        color="error"
      >
        Delete
      </Button>
      {data.ticket.sprint && (
        <>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setViewSprint(!viewSprint)}
            startIcon={
              !viewSprint ? <VisibilityOutlined /> : <VisibilityOffOutlined />
            }
            size="small"
          >
            {viewSprint ? "Hide Sprint" : "View Sprint"}
          </Button>
          {viewSprint && <TicketSprint sprint={data.ticket.sprint} />}
        </>
      )}
    </>
  );
};

export default Ticket;
