require "rails_helper"

feature "user can view ideas" do

  scenario "user sees all ideas on the root page", js: true do
    visit root_path

    fill_in "title", with: "idea title 0"
    fill_in "body", with: "idea body 0"
    click_button "Save"

    fill_in "title", with: "idea title 1"
    fill_in "body", with: "idea body 1"
    click_button "Save"

    visit root_path
    sleep(2)

    expect(current_path).to eq(root_path)

    expect(page).to have_content("idea title 0")
    expect(page).to have_content("idea body 0")
    expect(page).to have_content("swill")

    expect(page).to have_content("idea title 1")
    expect(page).to have_content("idea body 1")
    expect(page).to have_content("swill")
  end

end
