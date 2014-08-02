namespace :db do
  task populate: :environment do
    Post.destroy_all

    20.times do
      Post.create(title: Faker::Lorem.sentence(1), body: Faker::Lorem.paragraph(2))
    end
  end
end
