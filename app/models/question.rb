class Question < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :topic
  has_many :choices
  has_many :answers

  accepts_nested_attributes_for :choices, reject_if: proc { |attributes| attributes['title'].blank?}, allow_destroy: true
end
