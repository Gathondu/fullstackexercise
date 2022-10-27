class Mutations::DeleteTicket < Mutations::BaseMutation
   argument :id, String, required: true

  field :ticket, Types::TicketType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    ticket = Ticket.find(id)

    if ticket.destroy
      { ticket: ticket, errors: [] }
    else
      { ticket: ticket, errors: ticket.errors.full_messages }
    end
  end
end
