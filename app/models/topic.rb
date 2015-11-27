class Topic < ActiveRecord::Base
  validates_presence_of :title
  has_many :questions
  belongs_to :user
end
