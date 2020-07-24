
import React, { useState } from 'react'
import { useAPI } from './common'

const Rule = ({ rule })=>{
  const [fold, setFold] = useState(false)
  return <div>
    <h2>{rule.name}</h2>
    <img src={`./media/rule/${rule.image}.jpg`} alt={rule.name} />
    <div onClick={()=>{ setFold(!fold) }}>{fold ? '> 折叠详情' : '> 查看详情'}</div>
    {fold && <div>{rule.detail.map((line, i)=><p key={i}>{line}</p>)}</div>}
  </div>
}

const RuleList = ({ list })=>{
  const ruleList = Object.keys(list)
  return <>{ruleList.map((id)=><Rule rule={list[id]} key={id} />)}</>
}

const App = ()=>{
  const data = useAPI('./api/rule.json')
  if (data.state === 'load'){ return <div>loading...</div> }
  if (data.state === 'fail'){
    return <div>
      <div>fail</div>
      <pre>{JSON.stringify(data.result, null, 2)}</pre>
    </div>
  }
  return <RuleList list={data.result} />
}

export default ()=><React.StrictMode><App /></React.StrictMode>
