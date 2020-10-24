let accessToken = ''

export const setAccessToken = (s) => {
   accessToken = s
   console.log(accessToken)
}

export const getAccessToken = () => {
   return accessToken
}