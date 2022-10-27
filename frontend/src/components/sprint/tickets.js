import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

const SprintTickets = ({ tickets }) => {
  return (
    <Grid sx={{ mt: 5 }} container rowSpacing={1} columns={3} columnSpacing={2}>
      {tickets.map((ticket) => (
        <Grid item key={ticket.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={`/ticket/${ticket.id}`}>
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
  );
};

export default SprintTickets;
