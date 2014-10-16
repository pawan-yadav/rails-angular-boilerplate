# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!({
  email: "dylanjhaveri@gmail.com",
  name: "Dylan",
  password: "dpassword",
})

User.create!({
  email: "anseljhaveri@gmail.com",
  name: "Ansel",
  password: "apassword",
})

User.create!({
  email: "matt.nish@gmail.com",
  name: "Nish",
  password: "npassword",
})

User.create!({
  email: "marlonmolinare@gmail.com",
  name: "Marlon",
  password: "mpassword",
})

User.create!({
  email: "nickbastone@gmail.com",
  name: "Nick",
  password: "npassword",
})