class Mutations::CreateTicket < Mutations::BaseMutation
  argument name: String, required: true
  argument description: String, required: false
  argument points: Int, required: true

  field :ticket, Types::TicketType, null: false
  field :errors, [String], null: false

  def resolve(name:, points:, description: 'None')
    ticket = Ticket.create(
      name: name,
      points: points,
      desciption: description
    )

    if ticket.save
      { ticket: ticket, errors: [] }
    else
      { ticket: nil, errors: ticket.errors.full_messages }
    end
  end
end
