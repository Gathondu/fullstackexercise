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
      tickets {
        id
        name
        description
        points
      }
      points
    }
  }
`;

export const CREATE_SPRINT = gql`
  mutation createSprint(
    $name: String!
    $startDate: String!
    $endDate: String!
    $id: String
  ) {
    createSprint(
      name: $name
      startDate: $startDate
      endDate: $endDate
      id: $id
    ) {
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

export const DELETE_SPRINT = gql`
  mutation deleteSprint($id: String!) {
    deleteSprint(id: $id) {
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

export const ADD_TICKET_TO_SPRINT = gql`
  mutation addTicketToSprint($id: String!, $tickets: [String!]!) {
    addTicketToSprint(id: $id, tickets: $tickets) {
      sprint {
        id
        name
        startDate
        endDate
        tickets {
          id
          name
          description
          points
        }
        points
      }
      errors
    }
  }
`;

export const REMOVE_TICKET_FROM_SPRINT = gql`
  mutation removeTicketFromSprint($id: String!, $tickets: [String!]!) {
    removeTicketFromSprint(id: $id, tickets: $tickets) {
      sprint {
        id
        name
        startDate
        endDate
        tickets {
          id
          name
          description
          points
        }
        points
      }
      errors
    }
  }
`;
