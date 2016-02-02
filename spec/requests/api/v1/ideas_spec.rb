require "rails_helper"

describe Api::V1::IdeasController, type: :controller do

  def parse_response
    JSON.parse(response.body)
  end

  def create_idea
    Idea.create(title: "idea title", body: "idea body")
  end

  it "sends a list of ideas" do
    create_idea

    get :index, format: :json

    json_response = parse_response
    num_of_ideas = Idea.count

    expect(response).to be_success
    expect(json_response["ideas"].length).to eq(num_of_ideas)

    expect(json_response["ideas"].last["id"]).to eq(Idea.last.id)
    expect(json_response["ideas"].last["title"]).to eq(Idea.last.title)
    expect(json_response["ideas"].last["body"]).to eq(Idea.last.body)
    expect(json_response["ideas"].last["quality"]).to eq(Idea.last.quality)
  end

  it "sends a single idea" do
    idea = create_idea

    get :show, { id: idea.id }, format: :json

    json_response = parse_response

    expect(response).to be_success

    expect(json_response["id"]).to eq(Idea.last.id)
    expect(json_response["title"]).to eq(Idea.last.title)
    expect(json_response["body"]).to eq(Idea.last.body)
    expect(json_response["quality"]).to eq(Idea.last.quality)
  end

  it "creates an idea" do
    old_num_of_ideas = Idea.count
    idea_params = { title: "new title", body: "new body" }

    post :create, idea: idea_params, format: :json

    new_num_of_ideas = Idea.count
    json_response = parse_response

    expect(response).to be_success
    expect(json_response["id"]).to eq(Idea.last.id)
    expect(json_response["title"]).to eq(Idea.last.title)
    expect(json_response["body"]).to eq(Idea.last.body)
    expect(json_response["quality"]).to eq(Idea.last.quality)

    expect(Idea.last.title).to eq(idea_params[:title])
    expect(Idea.last.body).to eq(idea_params[:body])
    expect(new_num_of_ideas - old_num_of_ideas).to eq(1)
  end

  it "updates an idea" do
    old_num_of_ideas = Idea.count

    idea = create_idea
    idea_params = { title: "updated title", body: "updated body" }

    put :update, id: idea.id, idea: idea_params, format: :json

    new_num_of_ideas = Idea.count
    json_response = parse_response
    idea = Idea.find(idea.id)

    expect(response).to be_success
    expect(json_response).to eq("")

    expect(idea.title).to eq(idea_params[:title])
    expect(idea.body).to eq(idea_params[:body])
    expect(new_num_of_ideas - old_num_of_ideas).to eq(0)
  end

  it "deletes an idea" do
    old_num_of_ideas = Idea.count

    delete :destroy, id: Idea.last.id, format: :json

    new_num_of_ideas = Idea.count
    json_response = parse_response

    expect(response).to be_success
    expect(json_response).to eq("")

    expect(new_num_of_ideas - old_num_of_ideas).to eq(-1)
  end
end
