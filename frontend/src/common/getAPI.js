
export default (url, option = {})=>{
  if (!option.success){ option.success = (data)=>{ console.log(data) } }
  if (!option.fail){ option.fail = (error)=>{ console.error(error) } }
  let { success, fail } = option

  const cancelFunc = ()=>{ success = ()=>{}; fail = ()=>{} }
  const request = async ()=>{
    try{
      const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      if (!response.ok){
        return fail({
          code: response.status,
          message: response.statusText,
          time: new Date().toGMTString(),
          url,
        })
      }
      const data = await response.json()
      success(data)
    }catch(err){
      fail({ message: err.message, url, time: new Date().toGMTString() })
    }
  }
  request()
  return cancelFunc
}
