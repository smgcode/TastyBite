class Post < ActiveRecord::Base
  attr_accessible :description, :link, :submitter_id
  
  validates :description, presence: true
  validates :link, presence: true
  validates :submitter_id, presence: true
  
  belongs_to :user,
  :class_name => "User",
  :foreign_key => :submitter_id,
  :primary_key => :id  
end
