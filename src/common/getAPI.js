
export default (url,option={})=>{
  if (!option.success){ option.success = function(data){ console.log(data) } }
  if (!option.fail){ option.fail = function(error){ console.error(error) } }
  let success = option.success
  let fail = option.fail

  let cancelFunc = ()=>{ success = ()=>{}; fail = ()=>{} }
  let request = async ()=>{
    try{
      const response = await fetch(url,{method: 'GET', headers: {'Content-Type': 'application/json'} })
      if (!response.ok){
        return fail({
          code: response.status,
          message: response.statusText,
          url, time: new Date().toGMTString()
        })
      }
      let data = await response.json()
      success(data)
    }catch(err){
      fail({message: err.message, url, time: new Date().toGMTString()})
    }
  }
  request()
  return cancelFunc
}
