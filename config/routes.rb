TasteSpottingClone::Application.routes.draw do
  resources :users, :only => [:create, :new, :show, :index]
  resource :session, :only => [:create, :destroy, :new]
  resources :posts

  root :to => "roots#root"
end