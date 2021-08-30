export function formatDate (dateString: string) {
  const date = new Date(dateString + 'T00:00:00')
  return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear()
}

export function toLocalDate (dateString: string) {
  const date = new Date(dateString + 'T00:00:00')
  return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
}
