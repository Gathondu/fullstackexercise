import { gql } from "@apollo/client";

export const GET_TICKETS = gql`
  query tickets {
    tickets {
      id
      name
      description
      points
    }
  }
`;

export const GET_TICKET = gql`
  query ticket($id: ID!) {
    ticket(id: $id) {
      id
      name
      description
      points
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $name: String!
    $description: String!
    $points: Int!
    $sprintId: String!
  ) {
    createTicket(
      name: $name
      description: $description
      points: $points
      sprintId: $sprintId
    ) {
      ticket {
        id
        name
        description
        points
      }
      errors
    }
  }
`;
