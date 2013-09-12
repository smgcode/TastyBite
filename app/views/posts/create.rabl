object @post
attributes :id, :description, :link, :submitter_id
node(:url_medium) { @post.post_photo.url(:medium) }

child :categories do
  attributes :id, :name
end