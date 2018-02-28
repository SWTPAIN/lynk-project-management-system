const mongoose = require('mongoose')
const addDays = require('date-fns/add_days')
const User = require('../models/user')
const Project = require('../models/project')
require('../db')

// drop all collection
User.collection.drop()
Project.collection.drop()

// add seed data
const createUsers = User.create([
  {
    email: 'user1@lynk.com',
    password: 'password'
  },
  {
    email: 'user2@lynk.com',
    password: 'password'
  }
])

const createProjects = Project.create([
  {
    title: 'Cardano',
    status: 'new',
    experts: [
      {
        name: 'Charles Hoskinson',
        isApproved: true
      },
      {
        name: 'Jeremy Wood',
        isApproved: true
      }
    ]
  },
  {
    title: 'Ripple',
    status: 'new',
    experts: [
      {
        name: 'Alice',
        isApproved: true
      },
      {
        name: 'Bob Wood',
        isApproved: true
      }
    ],
    createdAt: addDays(new Date(), -4)
  },
  {
    title: 'Bitcoin',
    status: 'finished',
    experts: [
      {
        name: 'Joe',
        isApproved: true
      },
      {
        name: 'Opol Wood',
        isApproved: true
      }
    ]
  },
  {
    title: 'EOS',
    status: 'finished',
    experts: [
      {
        name: 'Peter',
        isApproved: true
      }
    ]
  }

])

// no finally for bluebird promise all inplementation
Promise.all([
  createUsers,
  createProjects
])
  .then(([users, projects]) => {
    console.log(`${users.length} users created`)
    console.log(`${projects.length} projects created`)
    mongoose.connection.close()
  })
  .catch((err) => {
    console.log('error in seeding: ', err)
    mongoose.connection.close()
  })
