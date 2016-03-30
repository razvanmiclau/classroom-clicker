class Answer < ActiveRecord::Base
  visitable
  belongs_to :question
end
