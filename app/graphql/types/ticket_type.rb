# frozen_string_literal: true

module Types
  class TicketType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :points, Integer, null: false
    field :sprint, Types::SprintType, null: false

    def sprint
      object.sprint
    end
  end
end
