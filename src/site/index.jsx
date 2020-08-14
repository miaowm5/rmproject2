
import React from 'react'
import Header from '../header'
import Error from '../error'
import { useAPI } from '../common'
import styles from './index.module.css'

const RuleList = ({ list })=>{
  const rule = useAPI('./api/rule.json')
  if (rule.state === 'fail'){ return <Error title="get rule fail" error={rule.result} /> }
  if (rule.state === 'load'){ return <div>loading...</div> }
  const database = rule.result
  return <>{list.map((id, i)=><Rule key={i} rule={database[id]} />)}</>
}

const Rule = ({ rule })=><p><a href={`#!rule/${rule.id}`} className={styles.rule}>
  <img src={`./media/rule/${rule.image}.jpg`} alt={rule.name} />
</a></p>

const Detail = ({ data })=><div>
  {data.logo && <div><img src={`./media/site/${data.logo}`} alt="logo" /></div>}
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
    <RuleList list={data.rule} />
    {data.rule2.map((c, i)=><p key={i}>{c}</p>)}
    <p>（翻译By {data.author} 确认时间 {data.updateTime}）</p>
  </div>
  {data.comment.length > 0 && <>
    <p>备注：</p>
    {data.comment.map((c, i)=><p key={i}>{c}</p>)}
  </>}
</div>

const SiteMain = ({ id })=>{
  const site = useAPI(`./api/site/${id}.json`)
  if (site.state === 'fail'){ return <Error title="get site fail" error={site.result} /> }
  if (site.state === 'load'){ return <div className={styles.body}>loading...</div> }
  return <div>
    <Header />
    <div className={styles.body}><Detail data={site.result} /></div>
  </div>
}

export default ({ id })=>{
  if (!id){ return null }
  return <SiteMain id={id} />
}
