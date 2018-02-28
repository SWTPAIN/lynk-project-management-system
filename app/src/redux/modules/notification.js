import createAction from '../../helpers/redux/createAction'

// current there won't be any state change for this module.
// the only reason is to keep the notifiaction followed by redux action
// and put sideeffect(calling UIKIT method) in Saga
const SHOW_NOTIFICATION = createAction('AUTH/SHOW_NOTIFICATION')

export const actions = {
  SHOW_NOTIFICATION
}

const initialState = {
}

// reducers
export default function reducer (state = initialState, action) {
  return state
}

// action creators
export const showNotification = (message, type) => ({
  type: SHOW_NOTIFICATION,
  payload: {message, type}
})

export const showErrorNotification = message => showNotification(message, 'danger')
export const showSuccessNotification = message => showNotification(message, 'success')
