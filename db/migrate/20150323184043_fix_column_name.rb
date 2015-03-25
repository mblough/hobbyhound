class FixColumnName < ActiveRecord::Migration
  def change
  	rename_column :shows, :type, :showtype
  end
end
