class ApplicationController < ActionController::API
  def fallback_index_html
    render :file => 'public/build/index.html'
  end
end
