module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :sprints, [Types::SprintType], null: false, description: 'Sprints'
    field :tickets, [Types::TicketType], null: false, description: 'Tickets'

    def sprints
      Sprint.all
    end

    def tickets
      Ticket.all
    end

    field :sprint, Types::SprintType, null: false do
      argument :id, ID, required: true
    end

    field :ticket, Types::TicketType, null: false do
      argument :id, ID, required: true
    end

    def sprint(id:)
      Sprint.find(id)
    end

    def ticket(id:)
      Ticket.find(id)
    end
  end
end
