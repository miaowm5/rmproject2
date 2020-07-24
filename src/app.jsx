
import React, { useState } from 'react'
import { useAPI, ctx } from './common'

const { useCtx: useGlobalCtx, Provider: GlobalCtx } = ctx()

const Rule = ({ id })=>{
  const { rule: database } = useGlobalCtx()
  const rule = database[id]
  const [fold, setFold] = useState(false)
  return <div onClick={()=>setFold(!fold)}>
    <h3>{rule.name}</h3>
    <img src={`./media/rule/${rule.image}.jpg`} alt={rule.name} />
    {fold && <div>{rule.detail.map((line, i)=><p key={i}>{line}</p>)}</div>}
  </div>
}

const Error = ({ error, title })=><div>
  <div>{title}</div>
  <pre>{JSON.stringify(error, null, 2)}</pre>
</div>

const Detail = ({ id })=>{
  const api = useAPI(`./api/site/${id}.json`)
  if (api.state === 'load'){ return <div>loading...</div> }
  if (api.state === 'fail'){ return <Error title="get detail fail" error={api.result} /> }
  const data = api.result
  return <div>
    <p>站点名称：{data.name}</p>
    <p>站长：{data.owner}</p>
    <p>站点地址：<a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a></p>
    <p>语言：{data.language.join('、')}</p>
    <p>墙？：{data.gfw ? '有' : '无'}</p>
    <p>素材内容：{data.category.map((c)=>`${c}素材`).join('、')}</p>
    <p>素材地址：<a href={data.url2} target="_blank" rel="noopener noreferrer">{data.url2}</a></p>
    <p>素材利用规约：</p>
    <div>
      <p>原文：<a href={data.url3} target="_blank" rel="noopener noreferrer">{data.url3}</a></p>
      {data.rule.map((rid, i)=><Rule key={i} id={rid} />)}
      {data.rule2.map((c, i)=><p key={i}>{c}</p>)}
      <p>（翻译By {data.author} 确认时间 {data.updateTime}）</p>
    </div>
    {data.comment.length > 0 && <>
      <p>备注：</p>
      {data.comment.map((c, i)=><p key={i}>{c}</p>)}
    </>}
  </div>
}

const Site = ({ site })=>{
  const [detail, setDetail] = useState(false)
  return <div>
    <h2>{site.name}</h2>
    <div><img src={`./media/site/${site.logo}`} alt={site.name} /></div>
    <div>{site.category.map((c, i)=><p key={i}>{c}素材</p>)}</div>
    {detail ? <><Detail id={site.id} /></> : <div onClick={()=>setDetail(true)}>详细</div>}
  </div>
}

const Main = ()=>{
  const { site } = useGlobalCtx()
  return <div>
    <h1>授权素材推广计划</h1>
    {site.map((item)=><Site key={item.id} site={item} />)}
  </div>
}

const App = ()=>{
  const site = useAPI('./api/site.json')
  const rule = useAPI('./api/rule.json')
  if (site.state === 'fail'){ return <Error title="get site fail" error={site.result} /> }
  if (rule.state === 'fail'){ return <Error title="get rule fail" error={rule.result} /> }
  if (site.state === 'load' || rule.state === 'load'){ return <div>loading...</div> }
  return <GlobalCtx value={{ site: site.result, rule: rule.result }}><Main /></GlobalCtx>
}

export default ()=><React.StrictMode><App /></React.StrictMode>
