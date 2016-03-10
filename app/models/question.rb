class Question < ActiveRecord::Base
  before_create :set_uuid
  self.primary_key = :uuid

  belongs_to :topic
  has_many :choices
  has_many :answers

  accepts_nested_attributes_for :choices, reject_if: proc { |attributes| attributes['title'].blank?}, allow_destroy: true
  private
    def set_uuid
      self.uuid = generate_uuid
    end

    def generate_uuid
      SecureRandom.uuid.gsub(/\-/,'')
    end

end
