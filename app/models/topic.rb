class Topic < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_many :questions, :dependent => :destroy
  belongs_to :user

  validates :title, presence: true, length: {minimum: 4}, uniqueness: {scope: :user}

end
