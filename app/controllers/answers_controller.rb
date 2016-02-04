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
    @answers = @question.answers.all
    @answer = @question.answers.build(answer_params)
    respond_to do |format|
        if @answer.save
          format.html {redirect_to topic_question_answers_path, notice: 'Success'}
          format.js {}
          format.json { render json: @answer, status: :created, location: @answer}
        else
          redirect_to topic_question_answers_path, notice: 'Fail'
          format.json { render json: @answer.errors, status: :unprocessable_entity}
        end
      end
  end

  def data
    render :json => Question.find(params[:question_id]).answers
  end

  private
    def answer_params
      params.require(:answer).permit(:value, :question_id)
    end
end
