const { connect, connection } = require('mongoose');
const User = require('./user');
const Company = require('./company');
const faker = require('faker');

async function seed() {
  connect('mongodb+srv://admin:admin@cluster0-a7swf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  const user = new User({
    login: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  });
  const company = new Company({
    name: user.login,
    userId: user._id,
    interviewDate: new Date(),
    createDate: new Date(),
    questions: 'used',
    tasks: 'used',
    contentText: 'used',
    rating: 12234,
    userId: user._id,
    name: user.login,
  });

  await user.save();
  await company.save();
  await connection.close();
}

seed();
