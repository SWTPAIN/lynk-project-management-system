import format from 'date-fns/format'

export default function formatDate (dateString) {
  return format(dateString, 'DD/MM/YYYY')
}
