class AddClientIdToSale < ActiveRecord::Migration[7.0]
  def change
    add_column :sales, :client_id, :string
  end
end
