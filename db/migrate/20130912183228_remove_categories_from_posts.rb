class RemoveCategoriesFromPosts < ActiveRecord::Migration
  def up
    remove_column :posts, :categories
  end

  def down
    add_column :posts, :categories, :string
  end
end
