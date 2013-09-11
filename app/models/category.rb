class Category < ActiveRecord::Base
  attr_accessible :name, :post_ids
  
  has_many :memberships,
  :class_name => "CategoryMembership",
  :foreign_key => :category_id,
  :primary_key => :id
  
  has_many :members,
  :through => :memberships,
  :source => :post
end
