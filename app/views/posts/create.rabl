object @post
attributes :id, :description, :link, :submitter_id, :post_photo
node(:url_medium) { @post.post_photo.url(:medium) }