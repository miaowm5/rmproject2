
import { useEffect, useState } from 'react'
import getAPI from './getAPI'

export default (url)=>{
  const [state, setState] = useState('load')
  const [result, setResult] = useState(null)
  useEffect(()=>getAPI(url, {
    success: (data)=>{ setResult(data); setState('success') },
    fail: (err)=>{ setResult(err); setState('fail') },
  }), [url])
  return { result, state }
}
