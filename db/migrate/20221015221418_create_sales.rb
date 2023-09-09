class CreateSales < ActiveRecord::Migration[7.0]
  def change
    create_table :sales do |t|
      t.decimal :total
      t.text :description

      t.timestamps
    end
  end
end
