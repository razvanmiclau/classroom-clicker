class QuestionsController < ApplicationController
  before_action :set_topic
  before_action :set_question, only: [:show, :edit, :update, :destroy]
  before_action :set_question_type, only: [:new, :create, :edit, :update]
  before_action :authenticate_user!, except: [ :index ]
  respond_to :html, :js

  def index
    @questions = @topic.questions.order('created_at desc')
  end

  def show
    @answers = @question.answers.all
    @domain = request.base_url
    @tinyURL = TinyurlShortener.shorten(@domain + topic_question_answers_path(@topic, @question, @answer))
    @visits = @question.answers.first

    # CALCULATE ENGAGEMENT RATE
    if @answers.count != 0
      @question.engagement_rate = (@answers.count*100)/(@visits.impressionist_count.nonzero? || 1)
        if @question.engagement_rate.between? 0, 25
          @rate = 'POOR'
        elsif @question.engagement_rate.between? 25, 50
          @rate = 'AVERAGE'
        elsif @question.engagement_rate.between? 50, 75
          @rate = 'GOOD'
        elsif @question.engagement_rate > 100
          @question.engagement_rate = 100
        else
          @rate = 'EXCELLENT'
        end
      @question.save!
    end
  end

  def statistics
    @question = Question.find(params[:question_id])
    @answers = @question.answers
    @visits = @question.answers.first
  end

  def data
    # {id: 1, title: 'What sup', answers: 5, visits: 5, ER: 100}
      questionsHash = @topic.questions.all
      @questionsArray = Array.new
        # questionsHash.each do |question|
        #   @questionsArray.push(
        #     { :id => question['id'],
        #       :title => question['title'],
        #       :answers => question.answers.count,
        #       :visits => question.answers.first.impressionist_count,
        #       :engagement_rate => question['engagement_rate']
        #     }
        #   )
        # end

        @chartArray = Array.new
        @answersObject = {name: "answers"}
        @visitsObject = {name: "visits"}
        @rateObject = {name: "engagement rate"}
        answers = []
        visits = []
        rates = []

        questionsHash.each do |q|
          answers.push([q['title'], q.answers.count])
          visits.push([q['title'], q.answers.first.impressionist_count])
          rates.push([q['title'], q['engagement_rate']])
        end
        @answersObject[:data] = answers
        @visitsObject[:data] = visits
        @rateObject[:data] = rates
        @chartArray.push(@answersObject, @visitsObject, @rateObject)

    #render :json => @questionsArray.chart_json
    render :json => @chartArray
  end

  def new
    @question = @topic.questions.build
    @question.choices.build
  end

  def edit
  end

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

  def destroy
    @question.destroy
    respond_to do |format|
      format.html { redirect_to @topic, notice: 'Question was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
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

    def question_params
      params.require(:question).permit(:title, :kind, :topic_id, :question_id, { choices_attributes: [:title, :question_id, :_destroy] })
    end
end
