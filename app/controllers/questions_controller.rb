class QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :edit, :update, :destroy]
  before_action :set_topic
  before_action :set_question_type, only: [:new, :create, :edit, :update]
  before_action :is_teacher!, except: [ :index ]
  respond_to :html, :js

  # GET /questions
  # GET /questions.json
  def index
    @questions = Question.all
  end

  # GET /questions/1
  # GET /questions/1.json
  def show
    @answers = @question.answers.all
    @tinyURL = TinyurlShortener.shorten(topic_question_answers_path(@topic, @question, @answer))
    @counts = @question.answers.first

    # CALCULATE THE ENGAGEMENT RATE
    if @answers.count != 0
      @question.engagement_rate = (@answers.count*100)/@counts.impressionist_count
        if @question.engagement_rate.between? 0, 25
          @rate = 'POOR'
        elsif @question.engagement_rate.between? 25, 50
          @rate = 'AVERAGE'
        elsif @question.engagement_rate.between? 50, 75
          @rate = 'GOOD'
        else
          @rate = 'EXCELLENT'
        end
      @question.save!
    end
  end

  # GET /questions/new
  def new
    @question = @topic.questions.build
    @question.choices.build
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions
  # POST /questions.json
  def create
    @question = @topic.questions.build(question_params)
    respond_to do |format|
      if @question.save
        format.html { redirect_to @topic, notice: 'Question was successfully created.' }
        format.json { render :show, status: :created, location: @question }
      else
        format.html { render :new }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /questions/1
  # PATCH/PUT /questions/1.json
  def update
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to @topic, notice: 'Question was successfully updated.' }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { render :edit }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /questions/1
  # DELETE /questions/1.json
  def destroy
    @question.destroy
    respond_to do |format|
      format.html { redirect_to @topic, notice: 'Question was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def data
    # SELECT("key1", "key2") to select only specific keys
    # render :json => @topic.questions.select("topic_id, title, engagement_rate")
    # render :json => Visit.select("id","visitor_token") => List of Visits
    # render :json => Ahoy::Event.all.select("visit_id", "time")
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    def set_question_type
      @question_types = [
        [ "Open Question", "Open Question"],
        [ "Multiple-choice", "Multiple-choice"],
        [ "True/False", "True/False"]
      ]
    end

    def set_topic
      @topic = Topic.friendly.find(params[:topic_id])
    end



    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:title, :kind, :topic_id, :question_id, { choices_attributes: [:title, :question_id, :_destroy] })
    end
end
