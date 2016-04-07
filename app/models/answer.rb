class Answer < ActiveRecord::Base
  is_impressionable
  belongs_to :question
end
