class Sale < ApplicationRecord
    has_many :sales_details
    belongs_to :client
end
