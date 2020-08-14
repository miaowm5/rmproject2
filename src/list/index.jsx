
import React from 'react'
import Header from '../header'
import Error from '../error'
import { useAPI } from '../common'
import styles from './index.module.css'

const Site = ({ site })=><div className={styles.item}>
  <a href={`#!site/${site.id}`} className={styles.title}>{site.name}</a>
  <div>{site.category.map((c, i)=><p className={styles.tag} key={i}>{c}素材</p>)}</div>
</div>

export default ()=>{
  const site = useAPI('./api/site.json')
  if (site.state === 'fail'){ return <Error title="get site fail" error={site.result} /> }
  if (site.state === 'load'){ return <div className={styles.body}>loading...</div> }
  return <div>
    <Header />
    <div className={styles.body}>
      {site.result.map((item)=><Site key={item.id} site={item} />)}
    </div>
  </div>
}
