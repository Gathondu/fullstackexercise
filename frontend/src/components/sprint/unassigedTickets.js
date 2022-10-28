import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { GET_UNASSIGNED_TICKETS } from "../../graphql/ticket";
import { ADD_TICKET_TO_SPRINT, GET_SPRINT } from "../../graphql/sprint";
import { useParams } from "react-router-dom";

const UnassigedTickets = ({ unassignedTickets }) => {
  const [tickets, setTickets] = useState([]);
  const { sprintId: id } = useParams();

  const [addToSprint] = useMutation(ADD_TICKET_TO_SPRINT, {
    refetchQueries: [
      { query: GET_UNASSIGNED_TICKETS },
      { query: GET_SPRINT, variables: { id } },
    ],
  });

  const handleChange = (id) => {
    if (tickets.includes(id)) {
      setTickets(tickets.filter((ticket) => ticket !== id));
    } else {
      setTickets([...tickets, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToSprint({ variables: { id, tickets } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1 }}>
          <Button sx={{ width: "fit-content" }} type="submit">
            Add To Sprint
          </Button>
          <Grid container rowSpacing={1} columns={3} columnSpacing={2}>
            {unassignedTickets.map((unassignedTicket) => (
              <Grid item key={unassignedTicket.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea
                    onClick={() => handleChange(unassignedTicket.id)}
                  >
                    <Checkbox
                      checked={tickets.indexOf(unassignedTicket.id) > -1}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {unassignedTicket.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {unassignedTicket.description}
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        {unassignedTicket.points}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};
export default UnassigedTickets;
