collection @posts
attributes :id, :description, :link
node(:url_medium) {|post| post.post_photo.url(:medium) }