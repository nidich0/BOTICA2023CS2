json.extract! client, :id, :name, :address, :telephone, :created_at, :updated_at
json.url client_url(client, format: :json)
