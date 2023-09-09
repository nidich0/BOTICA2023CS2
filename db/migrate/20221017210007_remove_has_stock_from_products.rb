class RemoveHasStockFromProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :has_stock, :string
  end
end
