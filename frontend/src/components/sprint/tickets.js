import React, { useState, useEffect } from "react";
import {
  CardActionArea,
  Grid,
  CardContent,
  Card,
  Typography,
  FormControl,
  Button,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { REMOVE_TICKET_FROM_SPRINT } from "../../graphql/sprint";
import { useMutation } from "@apollo/client";
import { DoneAllOutlined, DeleteOutline } from "@mui/icons-material";

const SprintTickets = ({ tickets }) => {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const { sprintId: id } = useParams();

  const [
    removeFromSprint,
    {
      client: { cache },
      loading,
    },
  ] = useMutation(REMOVE_TICKET_FROM_SPRINT, {
    update() {
      cache.modify({
        fields: {
          unassignedTickets: (previous, { toReference }) => {
            return [
              ...previous,
              ...selectedTickets.map((ticket) => ({
                ...toReference(tickets.filter((tick) => tick.id === ticket)),
              })),
            ];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!loading) {
      setSelectedTickets([]);
    }
  }, [loading]);

  const handleChange = (id) => {
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter((ticket) => ticket !== id));
    } else {
      setSelectedTickets([...selectedTickets, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    removeFromSprint({ variables: { id, tickets: selectedTickets } });
  };

  const toggleSelect = (e) => {
    e.preventDefault();
    if (selectedTickets.length > 0) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(tickets.map((ticket) => ticket.id));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1 }}>
          <div>
            <Button
              sx={{ mr: 2 }}
              type="submit"
              startIcon={<DeleteOutline />}
              color="error"
              variant="contained"
            >
              Remove From Sprint
            </Button>
            <Button
              onClick={toggleSelect}
              variant="outlined"
              startIcon={<DoneAllOutlined />}
            >
              select all
            </Button>
          </div>
          <Grid
            sx={{ mt: 2 }}
            container
            rowSpacing={1}
            columns={3}
            columnSpacing={2}
          >
            {tickets.map((ticket) => (
              <Grid item key={ticket.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleChange(ticket.id)}>
                    <Checkbox
                      checked={selectedTickets.indexOf(ticket.id) > -1}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {ticket.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ticket.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ticket.points}
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

export default SprintTickets;
