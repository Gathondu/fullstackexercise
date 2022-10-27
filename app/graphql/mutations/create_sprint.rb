class Mutations::CreateSprint < Mutations::BaseMutation
  argument :name, String, required: true
  argument :start_date, String, required: true
  argument :end_date, String, required: true
  argument :id, String, required: false

  field :sprint, Types::SprintType, null: false
  field :errors, [String], null: false

  def resolve(name:, start_date:, end_date:, id: nil)
    params = { name: name,
               start_date: start_date,
               end_date: end_date,
               points: 0 }
    sprint = id ? Sprint.find(id) : Sprint.create(params)
    sprint.points = sprint.tickets.map.sum(&:points)

    if sprint.update(params) || sprint.save
      { sprint: sprint, errors: [] }
    else
      { sprint: nil, errors: sprint.errors.full_messages }
    end
  end
end
