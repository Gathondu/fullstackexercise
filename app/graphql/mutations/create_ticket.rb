class Mutations::CreateTicket < Mutations::BaseMutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :points, Int, required: true
  argument :sprint_id, String, required: true

  field :ticket, Types::TicketType, null: false
  field :errors, [String], null: false

  def resolve(name:, points:, sprint_id:, description: 'None')
    sprint = Sprint.find(sprint_id)
    ticket = Ticket.create(
      name: name,
      points: points,
      description: description,
      sprint: sprint
    )

    if ticket.save
      { ticket: ticket, errors: [] }
    else
      { ticket: nil, errors: ticket.errors.full_messages }
    end
  end
end
