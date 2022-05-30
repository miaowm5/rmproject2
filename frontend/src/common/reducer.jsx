
import React, { useReducer, useCallback, useContext, useMemo } from 'react'

export default (reducerFunc)=>{
  const reducer = (state, action)=>{
    const func = reducerFunc[action.type]
    if (func){ return func(state, action.data) }
    throw new Error('Reducer Missing!')
  }
  const ReducerCtx = React.createContext(null)
  const Component = ({ param, children })=>{
    const [state, dispatch] = useReducer(reducer, param, (data)=>reducer(null, { type: 'init', data }))
    const dispatchFunc = useCallback((type, data = {})=>{ dispatch({ type, data }) }, [dispatch])
    const value = useMemo(()=>({ state, dispatch: dispatchFunc }), [state, dispatchFunc])
    return <ReducerCtx.Provider value={value}>
      {children}
    </ReducerCtx.Provider>
  }
  const useRedux = ()=>useContext(ReducerCtx)
  return { Component, useRedux }
}
