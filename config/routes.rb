Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: 'graphiql', graphql_path: 'graphql#execute' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'
  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
                                                                     !request.xhr? && request.format.html?
                                                                   }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
