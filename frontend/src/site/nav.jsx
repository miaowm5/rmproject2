
import React from 'react'
import styles from './nav.module.css'

const Item = ({ nav, setNav, select, children })=>{
  const className = [styles.item]
  if (nav - 0 === select){ className.push(styles.active) }
  return <div onClick={()=>setNav(nav - 0)} className={className.join(' ')}>
    {children}
  </div>
}

export default ({ nav, setNav })=><nav className={styles.main}>
  <Item nav="0" setNav={setNav} select={nav}>
    <i className="icon info circle" />站点信息
  </Item>
  <Item nav="1" setNav={setNav} select={nav}>
    <i className="icon edit" />编辑文章
  </Item>
</nav>
