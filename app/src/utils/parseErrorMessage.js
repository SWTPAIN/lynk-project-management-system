import {pathOr} from 'ramda'

const parseErrorMessage = (e, defaultMsg = 'Sorry. There is a error from server.') =>
  pathOr(defaultMsg, ['response', 'data', 'error'], e)

export default parseErrorMessage
