import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_SPRINT, DELETE_SPRINT } from "../../graphql/sprint";
import { GET_UNASSIGNED_TICKETS } from "../../graphql/ticket";
import { useQuery, useMutation } from "@apollo/client";
import { Typography, Button } from "@mui/material";
import SprintTickets from "./tickets";
import AddSprint from "./addSprint";
import dayjs from "dayjs";
import UnassigedTickets from "./unassigedTickets";

const Sprint = () => {
  const { sprintId: id } = useParams();
  const { data, loading, error } = useQuery(GET_SPRINT, { variables: { id } });
  const { data: unassignedTickets } = useQuery(GET_UNASSIGNED_TICKETS);
  const [viewTickets, setViewTickets] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [assignTickets, setAssignTickets] = useState(false);
  const navigate = useNavigate();
  const [deleteSprint] = useMutation(DELETE_SPRINT, {
    onCompleted: () => navigate("/sprints"),
    refetchQueries: ["sprints", { query: GET_UNASSIGNED_TICKETS }],
  });

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

  const { name, points, tickets, startDate, endDate } = data.sprint;

  return (
    <div>
      {isEditing ? (
        <AddSprint sprint={data.sprint} isEditing setIsEditing={setIsEditing} />
      ) : (
        <>
          <Button onClick={() => navigate("/sprints")}>Back to Sprints</Button>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Points: {points}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Tickets: {tickets.length > 0 ? tickets.length : "None"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(startDate).format("dddd, MMMM D YYYY")} -{" "}
            {dayjs(endDate).format("dddd, MMMM D YYYY")}
          </Typography>
        </>
      )}
      {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
      <Button onClick={() => deleteSprint({ variables: { id } })}>
        Delete
      </Button>
      {tickets.length > 0 && (
        <Button onClick={() => setViewTickets(!viewTickets)}>
          {!viewTickets ? "View Tickets" : "Hide Sprint Tickets"}
        </Button>
      )}
      {unassignedTickets?.unassignedTickets.length > 0 && (
        <Button onClick={() => setAssignTickets(!assignTickets)}>
          {!assignTickets ? "Assign Tickets" : "Hide Unassigned Tickets"}
        </Button>
      )}
      {tickets.length > 0 && viewTickets && <SprintTickets tickets={tickets} />}
      {unassignedTickets?.unassignedTickets.length > 0 && assignTickets && (
        <UnassigedTickets
          unassignedTickets={unassignedTickets?.unassignedTickets}
        />
      )}
    </div>
  );
};

export default Sprint;
