module Types
  class MutationType < Types::BaseObject
    field :create_sprint, mutation: Mutations::CreateSprint
    field :create_ticket, mutation: Mutations::CreateTicket, null: true
  end
end
