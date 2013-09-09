collection @users
attributes :id, :username

child (:posts) do
  attributes :description, :link, :submitter_id
  node(:url_medium) {|post| post.post_photo.url(:medium) }
end