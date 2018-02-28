const ProjectManagement = require('../services/projectManagement')

exports.getAll = function (req, res, next) {
  ProjectManagement
    .findAll()
    .then(projects =>
      res.status(200).json({
        projects
      })
    )
    .catch(e =>
      res.status(500).send(e.toString())
    )
}

exports.updateOne = function (req, res, next) {
  ProjectManagement
    .updateProject(req.params.projectId, req.body.project)
    .then(project => {
      res.status(200).json({project})
    })
    .catch(e =>
      res.status(500).send(e.toString())
    )
}
