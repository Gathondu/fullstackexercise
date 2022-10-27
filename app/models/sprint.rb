class Sprint
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :start_date, type: String
  field :end_date, type: String
  field :points, type: Integer

  has_many :tickets
end
