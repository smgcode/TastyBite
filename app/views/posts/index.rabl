collection @posts
attributes :description, :link
node(:url_medium) {|post| post.post_photo.url(:medium) }