Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root 'home#index'

  devise_for :users

  resources :clients
  resources :items
  resources :products
  resources :sales

  namespace :clients do
    resources :dnis, only: [:show]
  end

  namespace :admin do
    resources :suppliers, :products, :categories, :clients, :sales
    root 'suppliers#index'
  end
end
