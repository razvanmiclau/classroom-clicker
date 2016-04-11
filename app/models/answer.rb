class Answer < ActiveRecord::Base
  is_impressionable :unique => :request_hash
  belongs_to :question

  validates :value,
    presence: true,
    length: {in: 2..140}

end
