
import React, { useEffect, useState, useContext } from 'react'

const RouterCtx = React.createContext(null)

const handleHash = ()=>{
  let { hash } = window.location
  if (!hash.startsWith('#!')){ return { page: 'index' } }
  [hash] = hash.split('?')
  hash = hash.slice(2, hash.length).split('/')
  const page = hash.shift()
  if (hash.length > 0 && hash[hash.length - 1] === ''){ hash.pop() }
  return { page, param: hash }
}

const Router = ({ children })=>{
  const [route, setRoute] = useState(handleHash())
  useEffect(()=>{
    const updateRoute = ()=>setRoute(handleHash())
    window.addEventListener('hashchange', updateRoute, false)
    return ()=>window.removeEventListener('hashchange', updateRoute)
  }, [])
  return <RouterCtx.Provider value={route}>{ children }</RouterCtx.Provider>
}

const useRoute = ()=>useContext(RouterCtx)

export default { Router, useRoute }
