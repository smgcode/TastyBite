class Post < ActiveRecord::Base
  attr_accessible(
    :description,
    :link,
    :submitter_id,
    :post_photo,
    :category_ids
    )
  
  validates(
    :description,
    :link,
    :submitter_id,
    :presence => true
    )
  
  belongs_to :user,
  :class_name => "User",
  :foreign_key => :submitter_id,
  :primary_key => :id
  
  has_many :memberships,
  :class_name => "CategoryMembership",
  :foreign_key => :post_id,
  :primary_key => :id
  
  has_many :categories,
  :through => :memberships,
  :source => :category
  
  has_attached_file :post_photo, :styles => {
    # use # after dimensions to scale and crop.
    # use > after dimenstions to scale
    :medium => "250x250#"
  }
end
