class Topic < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  
  validates_presence_of :title
  has_many :questions
  belongs_to :user
end
