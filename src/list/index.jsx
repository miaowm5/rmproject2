
import React from 'react'
import { Header, Error, Loading } from '../component'
import { useAPI } from '../common'
import styles from './index.module.css'

const Site = ({ site })=><div className={styles.item}>
  <a href={`#!site/${site.id}`} className={styles.title}>
    {site.close && '【已关站】'}
    {site.name}
  </a>
  <div>{site.category.map((c, i)=><p className={styles.tag} key={i}>{c}素材</p>)}</div>
</div>

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
