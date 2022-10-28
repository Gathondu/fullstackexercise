class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :description, type: String
  field :points, type: Integer

  belongs_to :sprint

  scope :unassigned, -> { where(sprint: nil) }
end
