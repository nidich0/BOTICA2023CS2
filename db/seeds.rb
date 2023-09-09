# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
 
# Create a admin user
admin_user = User.create(
  email: 'admin@gmail.com',
  password: 'popeyelemarinosoy123',
  role: :admin
)


admin_user = User.create(
  email: 'admin22@gmail.com',
  password: 'popeyelemarinosoy123',
  role: :admin
)

###el terror de las venecas
# barata me la pelas
saller_user = User.create(
  email: 'saller@gmail.com',
  password: 'popeyelemarinosoy123',
  role: :saller
)


puts 'Admin user created'
puts 'Saller user created'


require 'csv'
csv_text = File.read(Rails.root.join('lib', 'seeds', 'catalogoproductos.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'UTF-8')
csv.each do |row|
  category = Category.find_or_create_by(name: row['categories'])  
  t = Product.new
  t.name = row['Nom_Prod']
  t.description = row['description_product']
  t.price = row['Precio']
  t.category = category
  if t.save
    puts t.to_s
    puts "#{t.name} saved"
  else
    puts "#{t.name} not saved"
    puts t.errors.full_messages
  end 
  supplier = Supplier.find_or_create_by(name: row['suppliers'])
end 