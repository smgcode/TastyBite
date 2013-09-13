class FavoritesController < ApplicationController
  
  def index
    @favorites = Favorite.all
    respond_to do |format|
      format.json { render :json => @favorites }
    end
  end
  
  def create
    @favorite = Favorite.create!(params[:favorite])
    render :json => @favorite
  end
  
  def update
    @favorite = Favorite.find_by_id(params[:id])
    @favorite.update_attributes!(params[:favorite])
    render :json => @favorite
  end
  
  def destroy
    @favorite = Favorite.find_by_id(params[:id])
    @favorite.destroy
    render :json => @post
  end

end
