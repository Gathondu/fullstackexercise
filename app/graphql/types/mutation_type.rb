module Types
  class MutationType < Types::BaseObject
    field :create_sprint, mutation: Mutations::CreateSprint
    field :create_ticket, mutation: Mutations::CreateTicket
  end
end
