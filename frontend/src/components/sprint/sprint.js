import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_SPRINT, DELETE_SPRINT } from "../../graphql/sprint";
import { GET_UNASSIGNED_TICKETS } from "../../graphql/ticket";
import { useQuery, useMutation } from "@apollo/client";
import {
  Typography,
  Button,
  CardContent,
  CircularProgress,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import SprintTickets from "./tickets";
import AddSprint from "./addSprint";
import dayjs from "dayjs";
import UnassigedTickets from "./unassigedTickets";
import {
  ModeEditOutline,
  DeleteOutline,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";

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

  const { name, points, tickets, startDate, endDate } = data.sprint;

  return (
    <div>
      {isEditing ? (
        <AddSprint sprint={data.sprint} isEditing setIsEditing={setIsEditing} />
      ) : (
        <>
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlined />}
            onClick={() => navigate("/sprints")}
          >
            Back to Sprints
          </Button>
          <CardContent>
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
          </CardContent>
        </>
      )}
      {!isEditing && (
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          startIcon={<ModeEditOutline />}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
      <Button
        variant="contained"
        startIcon={<DeleteOutline />}
        color="error"
        onClick={() => deleteSprint({ variables: { id } })}
      >
        Delete
      </Button>
      {tickets.length > 0 && (
        <Button
          startIcon={
            !viewTickets ? <VisibilityOutlined /> : <VisibilityOffOutlined />
          }
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => setViewTickets(!viewTickets)}
        >
          {!viewTickets ? "View Tickets" : "Hide Sprint Tickets"}
        </Button>
      )}
      {unassignedTickets?.unassignedTickets.length > 0 && (
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          startIcon={
            !assignTickets ? <VisibilityOutlined /> : <VisibilityOffOutlined />
          }
          onClick={() => setAssignTickets(!assignTickets)}
        >
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
