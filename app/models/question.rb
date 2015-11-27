class Question < ActiveRecord::Base
  belongs_to :topic
  has_many :choices
  accepts_nested_attributes_for :choices, reject_if: proc { |attributes| attributes['title'].blank?}, allow_destroy: true
end
