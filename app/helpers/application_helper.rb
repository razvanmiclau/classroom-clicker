module ApplicationHelper
  def display_fullname
    @fullname = current_user.first_name + ' ' + current_user.last_name
  end
end
