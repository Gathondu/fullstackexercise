import React from "react";
import { GET_TICKETS } from "../../graphql/ticket";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CircularProgress,
  Button,
  Grid,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";

const Tickets = () => {
  const { data, loading, error } = useQuery(GET_TICKETS);
  const navigate = useNavigate();

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
