class Sale < ApplicationRecord
    has_many :sales_details
    has_many :price , through: :sales_details
    belongs_to :client
end
