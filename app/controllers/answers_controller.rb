class AnswersController < ApplicationController
  respond_to :html, :js

  def index
    @question = Question.find(params[:question_id])
    @answers = @question.answers.all
    @answer = @question.answers.build

  end

  def new
    @question = Question.find(params[:question_id])
    @answer = @question.answers.build
  end

  def create
    @question = Question.find(params[:question_id])
    @answer = @question.answers.build(answer_params)
      if @answer.save
        redirect_to topic_question_answers_path, notice: 'Success'
      else
        redirect_to topic_question_answers_path, notice: 'Fail'
      end
  end

  private
    def answer_params
      params.require(:answer).permit(:value, :question_id)
    end
end
