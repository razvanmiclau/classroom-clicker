module ApplicationHelper
  def display_fullname
    @fullname = current_user.first_name + ' ' + current_user.last_name
  end

  def display_email
    @email = current_user.email
  end

  def display_username
    @username = current_user.first_name.downcase + current_user.last_name.downcase
  end

  def display_avatar(size)
    gravatar = Digest::MD5::hexdigest(current_user.email).downcase
    url = "http://gravatar.com/avatar/#{gravatar}.png?s=#{size}"
  end
end
