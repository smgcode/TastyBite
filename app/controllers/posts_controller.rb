class PostsController < ApplicationController
  before_filter :require_current_user!, :only => [:new, :create]
  # before_filter :require_no_current_user!, :only => [:index, :show]
  
  def index
    @posts = Post.all
    render :index
  end

  def new
    render :new
  end
  
  def create
    @post = Post.new(params[:post])
    @post.submitter_id = current_user.id
    if @post.save
      redirect_to post_url(@post)
    else
      render :new
    end
  end

  def show
    @post = Post.find_by_id(params[:id])
    render :show
  end

  # def edit
  #   @post = Post.find_by_id(params[:id])
  #   render :edit
  # end
  
  # def update
  #   @post = Post.find_by_id(params[:id])    
  #   @post.update_attributes!(params[:post])
  #   redirect_to post_url(@post)
  # end
  
end
