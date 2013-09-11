class CategoryMembership < ActiveRecord::Base
  attr_accessible :category_id, :post_id
  
  belongs_to :category,
  :class_name => "Category",
  :foreign_key => :category_id,
  :primary_key => :id
  
  belongs_to :post,
  :class_name => "Post",
  :foreign_key => :post_id,
  :primary_key => :id
end
