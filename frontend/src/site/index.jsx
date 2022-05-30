
import React, { useState } from 'react'
import { Error, Loading, Detail } from '../component'
import { useAPI } from '../common'
import Header from './header'
import Title from './title'
import Nav from './nav'
import Edit from './edit'
import styles from './index.module.css'

const Main = ({ data })=><div className={styles.articleContent}>
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
  const [nav, setNav] = useState(0)
  return <div className={styles.content}>
    <Title data={data} />
    <div className={styles.articleWrap}>
      <div className={`${styles.view} ${styles.article}`}>
        {nav === 0 && <Main data={data} />}
        {nav === 1 && <Edit data={data} />}
        <Nav nav={nav} setNav={setNav} />
      </div>
    </div>
  </div>
}
const Body = ({ id })=>{
  const site = useAPI(`./api/site/${id}.json`)
  return <div className={styles.main}>
    <Header />
    {site.state === 'success' ? <Content data={site.result} /> : <div className={styles.body}>
      <div className={styles.view}>
        {site.state === 'fail' && <Error title="get site fail" error={site.result} />}
        {site.state === 'load' && <Loading />}
      </div>
    </div>}
  </div>
}

export default ({ id })=>{
  if (!id){ return null }
  return <Body id={id} />
}
