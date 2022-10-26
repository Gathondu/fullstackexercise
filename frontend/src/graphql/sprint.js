import { gql } from "@apollo/client";

export const GET_SPRINTS = gql`
  query sprints {
    sprints {
      id
      name
      startDate
      endDate
      points
    }
  }
`;

export const GET_SPRINT = gql`
  query sprint($id: ID!) {
    sprint(id: $id) {
      id
      name
      startDate
      endDate
      tickets
      points
    }
  }
`;

export const CREATE_SPRINT = gql`
  mutation CreateSprint(
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    createSprint(name: $name, startDate: $startDate, endDate: $endDate) {
      sprint {
        id
        name
        startDate
        endDate
      }
      errors
    }
  }
`;
