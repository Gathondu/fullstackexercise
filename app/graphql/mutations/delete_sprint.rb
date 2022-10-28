class Mutations::DeleteSprint < Mutations::BaseMutation
  argument :id, String, required: true

  field :sprint, Types::SprintType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    sprint = Sprint.find(id)
    sprint.tickets.clear

    if sprint.delete
      { sprint: sprint, errors: [] }
    else
      { sprint: sprint, errors: sprint.errors.full_messages }
    end
  end
end
