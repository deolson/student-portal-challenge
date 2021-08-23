// Check if input email is type string @ string . string
export const isValidEmail = (email: string): boolean => {
  const regEx = /\S+@\S+\.\S+/
  return regEx.test(email)
}

// Check if a given string is empty
export const isEmptyString = (input: string): boolean => {
  if (input.trim() === '') return true
  else return false
}
