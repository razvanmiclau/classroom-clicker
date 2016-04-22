FactoryGirl.define do
  factory :user do |f|
    f.first_name "Razvan"
    f.last_name "Miclau"
    f.email "razvan.miclau@gmail.com"
    f.password "samplepassword"
  end
end
