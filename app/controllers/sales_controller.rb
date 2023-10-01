class SalesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    @sales = Sale.all
    render json: @sales
  end

  def create
    if params[:products].empty?
      render json: { error: "No products" }, status: :unprocessable_entity and return
    end

    error = nil

    ActiveRecord::Base.transaction do
      @sale = Sale.create(
        total: params[:total],
        client_id: params[:client_id],
      )

      insufficient_stock_product = nil

      # Create the sale details
      params[:products].each do |product|
        SalesDetail.create(
          quantity: product[:quantity],
          sale_id: @sale.id,
          product_id: product[:id],
        )

        founded_product = Product.find(product[:id])
        new_stock = founded_product.stock - product[:quantity].to_i

        if new_stock < 0
          error = "#{founded_product.name} solo tiene #{founded_product.stock} cantidad"
          raise ActiveRecord::Rollback
        end

        founded_product.update(stock: new_stock)
      end
    end

    if error
      render json: { error: error }, status: :unprocessable_entity
    else
      render json: @sale
    end
  end

  #metodo para ver sales details
  def showSaleDetails
    @sale = Sale.find(params[:id])
    @sale_details = SalesDetail.where(sale_id: @sale.id)
    if @sale.nil?
      render json: { error: "Sale not found" }, status: :unprocessable_entity and return
    else
      render json: @sale_details
    end
  end
end
