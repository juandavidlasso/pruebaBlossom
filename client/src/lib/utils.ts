export const formatDate = (value: string): string => {
  const date = isNaN(Number(value)) ? new Date(value) : new Date(Number(value))
  return date.toLocaleDateString()
}
