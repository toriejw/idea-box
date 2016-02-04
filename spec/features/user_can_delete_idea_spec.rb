require "rails_helper"

feature "deleting ideas" do

  scenario "user can delete an idea from the home page", js: true do
    idea = create_idea
    old_num_of_ideas = Idea.count

    visit root_path
    page.first("#delete-btn").click

    new_num_of_ideas = Idea.count

    # expect(page).to have_no_content("idea title")
    expect(old_num_of_ideas - new_num_of_ideas).to eq(1)
  end

end
