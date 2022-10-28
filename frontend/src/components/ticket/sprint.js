import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const TicketSprint = ({ sprint }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, mt: 3 }}>
      <CardActionArea onClick={() => navigate(`/sprint/${sprint.id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {sprint.name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Points: {sprint.points}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Dates: {dayjs(sprint.startDate).format("dddd, MMMM D YYYY")} -{" "}
            {dayjs(sprint.endDate).format("dddd, MMMM D YYYY")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TicketSprint;
