import React from "react";
import { GET_SPRINTS } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link, Grid } from "@mui/material";
import dayjs from "dayjs";

const Sprints = () => {
  const { data, loading, error } = useQuery(GET_SPRINTS);

  if (loading)
    return (
      <Typography gutterBottom variant="h5" component="div">
        "Loading Sprints..."
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
      <Link
        sx={{ marginTop: "3px" }}
        variant="button"
        underline="hover"
        href="/sprints/add"
      >
        Add Sprint
      </Link>

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
                <CardActionArea href={`/sprint/${sprint.id}`}>
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