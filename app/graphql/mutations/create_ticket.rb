class Mutations::CreateTicket < Mutations::BaseMutation
  argument :name, String, required: true
  argument :description, String, required: false
  argument :points, Int, required: true
  argument :sprint_id, String, required: false
  argument :ticket_id, String, required: false

  field :ticket, Types::TicketType, null: false
  field :errors, [String], null: false

  def resolve(name:, points:, sprint_id: nil, description: 'None', ticket_id: nil)
    params = {
      name: name,
      points: points,
      description: description
    }

    ticket = ticket_id ? Ticket.find(ticket_id) : Ticket.create(params)
    ticket.sprint = Sprint.find(sprint_id) if sprint_id

    if ticket.update(params) || ticket.save(validate: false)
      { ticket: ticket, errors: [] }
    else
      { ticket: ticket, errors: ticket.errors.full_messages }
    end
  end
end
