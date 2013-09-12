class CategoriesController < ApplicationController
  
  def index
    @categories = Category.all
    respond_to do |format|
      format.json { render :json => @categories }
    end
  end
  
  def create
    @category = Category.create!(params[:category])
    render :json => @category 
  end
  
  def update
    @category = Category.find_by_id(params[:id])
    @category.update_attributes!(params[:category])
    render :json => @category
  end
  
end
