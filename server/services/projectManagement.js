const Project = require('../models/project')
const {pick} = require('ramda')

const whitelistParams = ['title', 'status', 'experts']
const filterWhitelistParams = pick(whitelistParams)

exports.findAll = () =>
  Project.find()

exports.updateProject = (projectId, projectParams) =>
  Project.findById(projectId)
    .then(project =>
      Object.assign(project, filterWhitelistParams(projectParams))
        .save()
    )
