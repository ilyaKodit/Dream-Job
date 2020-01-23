const { connect, connection } = require('mongoose');
const User = require('./user');
const Feedback = require('./feedback');
const Company = require('./company');
const faker = require('faker');

async function seed() {
  connect('mongodb+srv://admin:admin@cluster0-a7swf.mongodb.net/dreamjob?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  const user = new User({
    login: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  });
  const company = new Company({
    Id: faker.random.number(),
    averageRating: faker.random.number(),
    count: faker.random.number(),
  });
  const feedback = new Feedback({
    userId: user._id,
    companyId: company._id,
    interviewDate: new Date(),
    createDate: new Date(),
    questions: 'used',
    tasks: 'used',
    contentText: 'used',
    rating: 12234, 
  });
  

  await user.save();
  await company.save();
  await feedback.save();
  await connection.close();
}

seed();
