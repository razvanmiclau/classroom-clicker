class AnswersController < ApplicationController
  before_action :set_question
  respond_to :html, :js

  def index
    @answers = @question.answers.all
    @answer = @question.answers.build
  end

  def new
    @answer = @question.answers.build
  end

  def create
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
    render :json => @question.answers
  end

  def total
    render :json => @question.answers.group(:value).count
  end

  def words
    valuesHash = @question.answers.all
    wordsArray = Array.new
      valuesHash.each do |key|
        wordsArray.push(key['value'].split()) #[[1,2,3],[4,5,6]]
      end
    @wordCloudArray = wordsArray.flatten #[1,2,3,4,5,6]
    render :json => @wordCloudArray
  end

  private
    def set_question
      @question = Question.friendly.find(params[:question_id])
    end

    def answer_params
      params.require(:answer).permit(:value, :question_id)
    end

end
