class AddDniToClients < ActiveRecord::Migration[7.1]
  def change
    add_column :clients, :dni, :string
  end
end
