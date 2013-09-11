class Post < ActiveRecord::Base
  POST_CATEGORIES = [
    "recipe",
    "food",
    "drink",
    "dinning",
    "products",
    "people",
    "news"
  ]

  attr_accessible :description, :link, :submitter_id, :post_photo, :categories
  
  validates(
    :description,
    :link,
    :submitter_id,
    :presence => true
    )

  # TODO validation failes. find out why.
  # validates :categories, :inclusion => POST_CATEGORIES
  
  belongs_to :user,
  :class_name => "User",
  :foreign_key => :submitter_id,
  :primary_key => :id  
  
  has_attached_file :post_photo, :styles => {
    # use # after dimensions to scale and crop.
    # use > after dimenstions to scale
    :medium => "250x250#"
  }
end
