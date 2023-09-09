class ClientsController < ApplicationController
  skip_before_action :authenticate_user!
	skip_before_action :verify_authenticity_token

  # GET /items or /items.json
  def index
    clients = Client.all
    render json: clients
  end

  # POST /items or /items.json
  def create
    @client = Client.new(item_params)

    respond_to do |format|
      if @client.save
        format.html { redirect_to item_url(@client), notice: "El cliente fue agregado!" }
        format.json { render :show, status: :created, location: @client }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def item_params
    params.require(:client).permit(:name, :address, :telephone)
  end
end
