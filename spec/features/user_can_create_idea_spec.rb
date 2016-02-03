require "rails_helper"

feature "creating an idea" do

  scenario "user can create idea from home page" do
    pending
    old_num_of_ideas = Idea.count
    visit root_path

    fill_in "title", with: "new idea title"
    fill_in "body", with: "new idea body"
    click_button "Save"

    new_num_of_ideas = Idea.count

    expect(current_path).to eq(root_path)

    expect(page).to have_content("new idea title")
    expect(page).to have_content("new idea body")

    expect(new_num_of_ideas - old_num_of_ideas).to eq(1)
  end

end
