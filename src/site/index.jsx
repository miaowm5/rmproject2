
import React, { useState } from 'react'
import { Header, Error, Loading, Detail } from '../component'
import { useAPI } from '../common'
import Edit from './edit'
import styles from './index.module.css'

const Main = ({ data })=><div>
  {data.close && <p>【本素材站已关站或迁移到了其他地址，若有关于本站的新地址请报告给我们】</p>}
  {data.logo && <div><img src={`./assets/site/${data.logo}`} alt="logo" /></div>}
  <p>站点名称：{data.name}</p>
  <p>站长：{data.owner}</p>
  <p>站点地址：<a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a></p>
  <p>语言：{data.language.join('、')}</p>
  <p>墙？：{data.gfw ? '有' : '无'}</p>
  <p>素材内容：
    {data.category.join('、')}
    {data.category2 && data.category2.length > 0 && data.category2.map((cat)=>cat[1]).join('、')}
  </p>
  <p>素材地址：<a href={data.url2} target="_blank" rel="noopener noreferrer">{data.url2}</a></p>
  <p>素材利用规约：</p>
  <div>
    <p>原文：<a href={data.url3} target="_blank" rel="noopener noreferrer">{data.url3}</a></p>
    <Detail content={data.ruleParse} />
    <p>（翻译By {data.author} 确认时间 {data.updateTime}）</p>
  </div>
  {data.comment.length > 0 && <>
    <p>备注：</p>
    <Detail content={data.comment} />
  </>}
</div>

const Content = ({ data })=>{
  const [edit, setEdit] = useState(false)
  if (edit){ return <Edit.Main closeEdit={()=>setEdit(false)} data={data} /> }
  return <>
    <Main data={data} />
    <Edit.Button openEdit={()=>setEdit(true)} />
  </>
}

const Body = ({ id })=>{
  const site = useAPI(`./api/site/${id}.json`)
  return <div>
    <Header />
    <div className={styles.body}>
      {site.state === 'fail' && <Error title="get site fail" error={site.result} />}
      {site.state === 'load' && <Loading />}
      {site.state === 'success' && <Content data={site.result} />}
    </div>
  </div>
}

export default ({ id })=>{
  if (!id){ return null }
  return <Body id={id} />
}
