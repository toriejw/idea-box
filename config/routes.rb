Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :show, :update, :destroy], :defaults => {:format => "json"}
    end
  end
end
