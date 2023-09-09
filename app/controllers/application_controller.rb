class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  # before_action :set_render_cart
  # before_action :initialize_cart


  def after_sign_in_path_for(resource)
    return admin_root_path if resource.admin?

    stored_location_for(resource) || root_path
  end

  # def set_render_cart
  #     @render_cart = true

  # end

  # def initialize_cart
  #   @cart || Cart.find_by(id: session[:cart_id])

  #   if @cart.nill?
  #     @cart = Cart.create
  #     session[:cart_id] = @cart.id
  #   end
  # end



end
