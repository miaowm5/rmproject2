
import React from 'react'
import styles from './header.module.css'

const Banner = ()=>{
  const style = { backgroundImage: 'url(assets/frontend/banner.jpg)' }
  return <div className={styles.banner} style={style} />
}
export default ()=><header className={styles.main}>
  <div>
    <Banner />
    <div className={styles.view}>
      <a href="./" className={styles.name}>授权素材推广计划</a>
    </div>
  </div>
</header>
