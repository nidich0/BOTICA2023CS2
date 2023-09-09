Rails.application.routes.draw do
  resources :items
  resources :clients
  resources :products 


 
  get 'download_prueba/:id', to: 'sales#download_prueba'
  get 'download_pdf/:id', to: 'sales#download_pdf'
  get 'showSaleDetails/:id', to: 'sales#showSaleDetails'
  resources :sales 
  # get 'dashboard_seller/index'
  get 'dashboard_seller', to: 'dashboard_seller#index'
  root 'home#index'
  devise_for :users

  namespace :admin do
    resources :suppliers, :products, :categories
    root 'suppliers#index'
  end

end
