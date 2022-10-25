class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :description, type: String
  field :points, type: Interger
  belongs_to :sprint
end
