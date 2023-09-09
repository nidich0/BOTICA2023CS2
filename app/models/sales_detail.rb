class SalesDetail < ApplicationRecord
  belongs_to :sale
  belongs_to :product
  has_many :price , through: :product
end
