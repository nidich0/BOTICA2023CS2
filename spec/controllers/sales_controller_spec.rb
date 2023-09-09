# sales_controller_spec.rb

require 'rails_helper'

RSpec.describe SalesController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      let!(:category) do 
        Category.create(name: "category")
      end
      let!(:product_1) do 
        Product.create(name: "Product 1", price: 100, category: category)
      end
      let!(:product_2) do 
        Product.create(
            name: "Product 2",
            price: 100, category: category
        )
      end
      let!(:client) do 
        Client.create(
            name: "Client 1",
            address: "Address 1",
            telephone: "123456789",
        )
      end
      let(:params) do
        {
          total: 100,
          client_id: client.id,
          products: [
            { id: product_1.id, quantity: 2 },
            { id: product_2.id, quantity: 3 },
          ],
        }
      end

      it "creates a new Sale" do
        expect { post :create, params: params }.to change(Sale, :count).by(1)
      end

      it "creates the expected number of SaleDetail objects" do
        expect { post :create, params: params }.to change(SalesDetail, :count).by(2)
      end

      it "returns a success response" do
        post :create, params: params
        expect(response).to be_successful
      end
    end

    context "with invalid params" do
      let(:params) do
        {
          total: 100,
          client_id: 1,
          products: [],
        }
      end

      it "returns an error response" do
        post :create, params: params, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end