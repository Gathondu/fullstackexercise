import React from "react";
import { GET_SPRINTS } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Button,
  Grid,
  CircularProgress,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Sprints = () => {
  const { data, loading, error } = useQuery(GET_SPRINTS);
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
        onClick={() => navigate("/sprints/add")}
      >
        Add Sprint
      </Button>

      {data.sprints.length > 0 ? (
        <Grid
          sx={{ mt: 5 }}
          container
          rowSpacing={1}
          columns={3}
          columnSpacing={2}
        >
          {data.sprints.map((sprint) => (
            <Grid item key={sprint.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => navigate(`/sprint/${sprint.id}`)}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {sprint.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(sprint.startDate).format("dddd, MMMM D YYYY")} -{" "}
                      {dayjs(sprint.endDate).format("dddd, MMMM D YYYY")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No Sprints Yet!!</Typography>
      )}
    </div>
  );
};

export default Sprints;
