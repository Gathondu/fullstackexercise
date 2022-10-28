module Types
  class MutationType < Types::BaseObject
    field :create_sprint, mutation: Mutations::CreateSprint
    field :create_ticket, mutation: Mutations::CreateTicket
    field :delete_sprint, mutation: Mutations::DeleteSprint
    field :delete_ticket, mutation: Mutations::DeleteTicket
    field :add_ticket_to_sprint, mutation: Mutations::AddToSprint
    field :remove_ticket_from_sprint, mutation: Mutations::RemoveFromSprint
  end
end
