# frozen_string_literal: true

module Types
  class SprintType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :start_date, String, null: false
    field :end_date, String, null: false
    field :points, Integer, null: false
    field :tickets, [Types::TicketType], null: true

    def tickets
      object.tickets
    end

    def points
      object.tickets.map.sum(&:points)
    end
  end
end
