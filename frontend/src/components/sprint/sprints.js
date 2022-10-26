import React from "react";
import { GET_SPRINTS } from "../../graphql/sprint";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";

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
  console.log(data);

  return (
    <div>
      <Link variant="button" underline="hover" href="/sprints/add">
        Add Sprint
      </Link>
      {data.sprints.length > 0 ? (
        data.sprints.map((sprint) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {sprint.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sprint.startDate - sprint.endDate}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography>No Sprints Yet!!</Typography>
      )}
    </div>
  );
};

export default Sprints;
