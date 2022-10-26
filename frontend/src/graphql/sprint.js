import { gql } from "@apollo/client";

export const GET_SPRINTS = gql`
  query sprints {
    sprints {
      id
      name
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
  mutation createSprint(
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    createSprint(name: $name, startDate: $startDate, endDate: $endDate) {
      id
      name
      startDate
      endDate
    }
  }
`;
