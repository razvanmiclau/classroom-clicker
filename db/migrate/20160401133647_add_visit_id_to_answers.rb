class AddVisitIdToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :visit_id, :uuid
  end
end
