class Answer < ActiveRecord::Base
  is_impressionable
  visitable
  belongs_to :question
  belongs_to :user
  has_many :visits

  #validates :user_id, :uniqueness => { :scope => :question_id, :message => "You may only answer once"}

end
