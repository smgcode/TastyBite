class Post < ActiveRecord::Base
  attr_accessible :description, :link, :submitter_id, :post_photo
  
  validates :description, presence: true
  validates :link, presence: true
  validates :submitter_id, presence: true
  
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
