class Mutations::CreateTicket < Mutations::BaseMutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :points, Int, required: true
  argument :sprint_id, String, required: true
  argument :ticket_id, String, required: false

  field :ticket, Types::TicketType, null: false
  field :errors, [String], null: false

  def resolve(name:, points:, sprint_id:, description: 'None', ticket_id: nil)
    sprint = Sprint.find(sprint_id)
    params = {
      name: name,
      points: points,
      description: description,
      sprint: sprint
    }

    ticket = ticket_id ? Ticket.find(ticket_id) : Ticket.create(params)

    if ticket.save || ticket.update(params)
      { ticket: ticket, errors: [] }
    else
      { ticket: nil, errors: ticket.errors.full_messages }
    end
  end
end
