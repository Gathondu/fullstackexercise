class Sprint
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :start_date, type: Time
  field :end_date, type: Time
  field :points, type: Integer

  has_many :tickets, dependent: :destroy
end
