class CreateCategoryMemberships < ActiveRecord::Migration
  def change
    create_table :category_memberships do |t|
      t.integer :post_id, :null => false
      t.integer :category_id, :null => false

      t.timestamps
    end
    add_index :category_memberships, :post_id
    add_index :category_memberships, :category_id
  end
end
