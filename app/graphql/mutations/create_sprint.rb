class Mutations::CreateSprint < Mutations::BaseMutation
  argument :name, String, required: true
  argument :start_date, String, required: true
  argument :end_date, String, required: true

  field :sprint, Types::SprintType, null: false
  field :errors, [String], null: false

  def resolve(name:, start_date:, end_date:)
    sprint = Sprint.create(
      name: name,
      start_date: start_date,
      end_date: end_date,
      points: 0
    )

    if sprint.save
      { sprint: sprint, errors: [] }
    else
      { sprint: nil, errors: sprint.errors.full_messages }
    end
  end
end
