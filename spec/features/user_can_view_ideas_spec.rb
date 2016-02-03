require "rails_helper"

feature "user can view ideas" do

  scenario "user sees all ideas on the root page", js: true do
    create_ideas(3)
    visit root_path

    expect(current_path).to eq(root_path)

    expect(page).to have_content("idea title 0")
    expect(page).to have_content("idea body 0")
    expect(page).to have_content("Swill")

    expect(page).to have_content("idea title 1")
    expect(page).to have_content("idea body 1")
    expect(page).to have_content("Plausible")

    expect(page).to have_content("idea title 2")
    expect(page).to have_content("idea body 2")
    expect(page).to have_content("Genius")
  end

end
