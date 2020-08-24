
import React from 'react'
import { Header, Error, Loading } from '../component'
import { useAPI } from '../common'
import styles from './index.module.css'

const Site = ({ site })=>{
  let category = site.category || []
  if (site.category2){
    const cate2 = []
    site.category2.forEach((cate)=>{
      if (cate[0] === '图片素材'){
        if (!cate2.includes('其他图片素材')){ cate2.push('其他图片素材') }
      }else if (cate[0] === '音乐素材'){
        if (!cate2.includes('其他音乐素材')){ cate2.push('其他音乐素材') }
      }else if (cate[0] === '脚本素材'){
        if (!cate2.includes('其他脚本素材')){ cate2.push('其他脚本素材') }
      }
    })
    category = category.concat(cate2)
  }
  return <div className={styles.item}>
    <a href={`#!site/${site.id}`} className={styles.title}>
      {site.close && '【已关站】'}
      {site.name}
    </a>
    <div>{category.map((c, i)=><p className={styles.tag} key={i}>{c}</p>)}</div>
  </div>
}

export default ()=>{
  const site = useAPI('./api/site.json')
  return <>
    <Header />
    <div className={styles.body}>
      {site.state === 'fail' && <Error title="get site fail" error={site.result} />}
      {site.state === 'load' && <Loading />}
      {site.state === 'success' && <>
        {site.result.map((item)=><Site key={item.id} site={item} />)}
      </>}
    </div>
  </>
}
