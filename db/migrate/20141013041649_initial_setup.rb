class InitialSetup < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :white, null: false
      t.integer :black, null: false
      t.string :winner
      t.string :key,    null: false
      t.string :status, null: false
      t.timestamps
    end
  end
end
