class Mutations::AddToSprint < Mutations::BaseMutation
  argument :id, String, required: true
  argument :tickets, [String], required: false

  field :sprint, Types::SprintType, null: false
  field :errors, [String], null: false

  def resolve(id:, tickets:)
    sprint = Sprint.find(id)
    new_tickets = Ticket.find(tickets)
    sprint.tickets << new_tickets

    if sprint.save
      { sprint: sprint, errors: [] }
    else
      { sprint: sprint, errors: sprint.errors.full_messages }
    end
  end
end
