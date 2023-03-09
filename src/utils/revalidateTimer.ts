export const revalidateTimer = () => {
  const seconds = 60
  const minutes = 60
  const hours = 24
  const days = 7

  return seconds * minutes * hours * days
}
