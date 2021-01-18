import Cookies from 'js-cookie'

const TokenKey = 'portal_token'

export function getToken() {
  localStorage.setItem("token",Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

