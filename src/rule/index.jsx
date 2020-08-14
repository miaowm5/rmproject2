
import React from 'react'
import Header from '../header'
import Error from '../error'
import { useAPI } from '../common'
import styles from './index.module.css'

const Rule = ({ rule })=>{
  if (!rule){ return null }
  return <div>
    <h3>{rule.name}</h3>
    <img src={`./media/rule/${rule.image}.jpg`} alt={rule.name} />
    <div>{rule.detail.map((line, i)=><p key={i}>{line}</p>)}</div>
  </div>
}

const RuleMain = ({ id })=>{
  const rule = useAPI('./api/rule.json')
  if (rule.state === 'fail'){ return <Error title="get site fail" error={rule.result} /> }
  if (rule.state === 'load'){ return <div className={styles.body}>loading...</div> }
  return <div>
    <Header />
    <div className={styles.body}><Rule rule={rule.result[id]} /></div>
  </div>
}

export default ({ id })=>{
  if (!id){ return null }
  return <RuleMain id={id} />
}
