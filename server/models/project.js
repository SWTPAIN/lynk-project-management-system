const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'finished']
  },
  experts: [
    {
      name: {type: String, required: true},
      isApproved: {type: Boolean, default: false}
    }
  ]
},
{
  timestamps: true
})

module.exports = mongoose.model('Project', ProjectSchema)
