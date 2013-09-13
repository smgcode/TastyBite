collection @users
attributes :id, :username
node(:current_user_id) { @current_user.id if @current_user }

child :posts do
  attributes :id, :description, :link, :submitter_id
  node(:url_medium) {|post| post.post_photo.url(:medium) }
end

child :favorites do
  attributes :user_id, :post_id
end