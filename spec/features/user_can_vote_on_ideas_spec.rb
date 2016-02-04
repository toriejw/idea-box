require "rails_helper"

feature "user can up and down vote ideas" do

  scenario "user can up vote", js: true do
    visit root_path

    fill_in "title", with: "new idea title"
    fill_in "body", with: "new idea body"
    click_button "Save"

    sleep(1)

    expect(Idea.last.quality).to eq(0)

    page.first(".up-vote-btn").click

    expect(page).to have_content("plausible")
    expect(Idea.last.quality).to eq(1)

    page.first(".up-vote-btn").click

    expect(page).to have_content("genius")
    expect(Idea.last.quality).to eq(2)
  end

end
