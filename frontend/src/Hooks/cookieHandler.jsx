import React, { useState, useEffect } from 'react'

function cookieHandler() {
  const [cookies, setCookies] = useState(document.cookie)
  const [refreshCookies, setRefreshCookies] = useState(false)

  useEffect(() => {
    setCookies(document.cookie)
  }, [refreshCookies])

  const addCookie = (name, value) => {
    document.cookie = `${name}=${value};max-age=${60*60*24*30};path='/';secure`
    return setRefreshCookies(prev => !prev)
  }

  const deleteCookie = (name) => {
    document.cookie = `${name}=value;max-age=0`
    return setRefreshCookies(prev => !prev)
  }

  const fetchCookie = (name) => {
    const cookies = document.cookie

    const foundCookie = cookies.split('; ').find(item => item.startsWith(`${name}=`))
    
    if (!foundCookie) return ''

    return foundCookie.split('=')[1]
  }

  const cookiesToJSON = () => {
    cookiesList = document.cookie.split('; ')
    const json = {}

    cookies.map(item => Object.assign(json, item))

    return json
  }

  return {
    cookies,
    addCookie,
    deleteCookie,
    fetchCookie,
    cookiesToJSON
  }
}

export default cookieHandler
