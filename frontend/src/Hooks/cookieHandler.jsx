import React, { useState, useMemo } from 'react'

function cookieHandler() {
  const [cookies, setCookies] = useState(document.cookie)

  useMemo(() => {
    setCookies(document.cookie)
    console.log(cookies)
  }, [document.cookie])

  const addCookie = (name, value) => document.cookie = `${name}=${value};max-age=${60*60*24*30};path='/';secure`

  const deleteCookie = (name) => document.cookie = `${name}=value;max-age=0`

  const fetchCookie = (name) => {
    const cookies = document.cookie

    const foundCookie = cookies.split('; ').find(item => item.startsWith(`${name}=`))
    
    if (!foundCookie) return ''

    return foundCookie.split('=')[1]
  }

  const cookiesToJSON = () => {
    cookies = document.cookie.split('; ')
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
