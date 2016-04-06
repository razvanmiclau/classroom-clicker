class AnswersController < ApplicationController
  respond_to :html, :js
  impressionist :actions => [:index, :test], unique: [:session_hash]

  def index
    @question = Question.find(params[:question_id])
    @answers = @question.answers.all
    @answer = @question.answers.build
    @session = session[:guest_user_id]
    if @answers.exists?
      @counts = @question.answers.first
      impressionist(@counts)
    end

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
    print ahoy.track "Answered Question", title: @question.title
  end

  def data
    @data = Question.find(params[:question_id]).answers
    @total = Question.where(:uuid => params[:question_id]).first.answers.group(:value).count
    @question = Question.find(params[:question_id])
      valuesHash = @question.answers.all
      wordsArray = Array.new
        valuesHash.each do |key|
          wordsArray.push(key['value'].split()) #[[1,2,3],[4,5,6]]
        end
    @wordCloudArray = wordsArray.flatten #[1,2,3,4,5,6]

    render :json => {:answers => @data, :total => @total, :words => @wordCloudArray}
  end

  def test
    @answers = Question.find(params[:question_id]).answers
    @question = Question.find(params[:question_id])
    @counts = @question.answers.first
    render :json => {:answers => @answers.count, :visits => @counts.impressionist_count}
  end

  private
    def answer_params
      params.require(:answer).permit(:value, :question_id)
    end
end
