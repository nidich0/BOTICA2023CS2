class Clients::DnisController < ApplicationController
  def show
    dni = params[:id]
    data = ReniecData.fetch_reniec_data(dni)

    if data && !data['nombres'].empty?
      name = "#{data['nombres']} #{data['apellidoPaterno']} #{data['apellidoMaterno']}"

      render json: { name: name }
    else
      render json: { error: 'No se pudo obtener los datos del DNI' }
    end
  end
end
