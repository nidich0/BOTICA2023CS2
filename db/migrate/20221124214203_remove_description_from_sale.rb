class RemoveDescriptionFromSale < ActiveRecord::Migration[7.0]
  def change
    remove_column :sales, :description, :text
  end
end
