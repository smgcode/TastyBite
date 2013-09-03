class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :link, :null => false
      t.string :description, :null => false
      t.integer :submitter_id, :null => false

      t.timestamps
    end
    add_index :posts, :submitter_id
  end
end
