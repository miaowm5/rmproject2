
import React from 'react'
import { useAPI } from '../../common'
import Error from '../error'
import Loading from '../loading'
import Detail from '../detail'
import { Component as ReduxWrap, useRedux } from './redux'

const Main = ()=>{
  const { state } = useRedux()
  if (!state.richText){ return null }
  return <>{state.richText.map((item, i)=>{
    let data = item
    if (item.type === 'rule'){
      const id = item.param[0]
      const rule = state.rule[id]
      if (!rule){
        data = { type: 'text', param: [`不存在的规约：${id}`] }
      }else{
        data = { type: 'ruleImage', param: [id, rule.name, rule.image] }
      }
    }
    return <Detail key={i} content={[data]} />
  })}</>
}
const MainWrap = ({ rule, richText })=><ReduxWrap param={{ rule, richText }}><Main /></ReduxWrap>

export default ({ richText })=>{
  const data = useAPI('./api/rule.json')
  return <div>
    {data.state === 'fail' && <Error title="get rule fail" error={data.result} />}
    {data.state === 'load' && <Loading />}
    {data.state === 'success' && <MainWrap rule={data.result} richText={richText} />}
  </div>
}
