const Project = require('../models/project')

exports.getAll = function (req, res, next) {
  Project.find()
    .exec()
    .then(projects =>
      res.status(200).json({
        projects
      })
    )
    .catch(e =>
      res.status(500).send(e.toString())
    )
}
