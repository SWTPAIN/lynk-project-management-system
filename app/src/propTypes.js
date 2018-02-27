import PropTypes from 'prop-types'

export const Expert = PropTypes.shape({
  name: PropTypes.string.isRequired,
  isApproved: PropTypes.bool.isRequired
})

export const Project = PropTypes.shape({
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  experts: PropTypes.arrayOf(Expert),
  createdAt: PropTypes.instanceOf(Date).isRequired
})
