object @post
attributes :id, :description, :link, :submitter_id, :categories
node(:url_medium) { @post.post_photo.url(:medium) }