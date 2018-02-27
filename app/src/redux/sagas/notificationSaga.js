export function * showNotification ({payload: {type, message}}) {
  window.UIkit.notification({
    message,
    status: type,
    pos: 'top-right',
    timeout: 3000
  })
}
