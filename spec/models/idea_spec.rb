require "spec_helper"

describe "Ideas model" do
  it "defaults quality to 0" do
    idea = Idea.create(title: "idea title", body: "idea body")

    expect(idea.quality).to eq(0)
  end
end
