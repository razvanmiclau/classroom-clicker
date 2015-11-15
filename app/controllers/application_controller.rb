class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :custom_layout

  def custom_layout
    if devise_controller? && resource_name == :user && action_name == 'new'
      "home-layout"
    else
      "application"
    end
  end

  protected
    def is_teacher!
      authenticate_user!
      redirect_to root_path, notice: 'You must be a teacher to access this website!' unless current_user.teacher?
    end
end
