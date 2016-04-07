class Answer < ActiveRecord::Base
  is_impressionable :unique => :request_hash
  belongs_to :question
end
