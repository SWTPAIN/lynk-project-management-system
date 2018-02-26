const GLOBAL_PREFIX = 'LYNK_PMS/'

const createAction = actionName =>
  `${GLOBAL_PREFIX}/${actionName}`

export default createAction
