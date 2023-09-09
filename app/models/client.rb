class Client < ApplicationRecord
    has_many :sales
    has_many :sales_details, through: :sales
    validates :name, presence: true
end
