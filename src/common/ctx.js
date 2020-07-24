
import React, { useContext } from 'react'

export default ()=>{
  const Ctx = React.createContext(null)
  const { Provider } = Ctx
  const useCtx = ()=>useContext(Ctx)
  return { useCtx, Provider }
}
