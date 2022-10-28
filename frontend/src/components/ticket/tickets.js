import React from "react";
import { GET_TICKETS } from "../../graphql/ticket";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";

const Tickets = () => {
  const { data, loading, error } = useQuery(GET_TICKETS);
  const navigate = useNavigate();

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading Tickets..."
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body2" color="text.secondary">
        `Fetch error! ${error.message}`
      </Typography>
    );

  return (
    <div>
      <Button
        sx={{ marginTop: "3px" }}
        variant="outlined"
        startIcon={<AddOutlined />}
        onClick={() => navigate("/tickets/add")}
      >
        Add Ticket
      </Button>

      {data.tickets.length > 0 ? (
        <Grid
          sx={{ mt: 5 }}
          container
          rowSpacing={1}
          columns={3}
          columnSpacing={2}
        >
          {data.tickets.map((ticket) => (
            <Grid item key={ticket.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ticket.name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {ticket.description}
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                      {ticket.points}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No Tickets Yet!!</Typography>
      )}
    </div>
  );
};

export default Tickets;
