class EnableUuidExtension < ActiveRecord::Migration
  def change
    enable_extension 'uuid-oosp'
  end
end
