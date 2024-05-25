export const generateComplexId = (): number => {
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 1e12)
  const complexId = timestamp * randomNum

  return complexId
}
