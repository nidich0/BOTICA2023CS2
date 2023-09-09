class RemoveClientIdFromSalesDetails < ActiveRecord::Migration[7.0]
  def change
    remove_column :sales_details, :client_id, :string
  end
end
