
import React from 'react'
import styles from './title.module.css'

const Back = ()=>{
  const style = { backgroundImage: 'url(assets/frontend/back.jpg)' }
  return <div className={styles.back} style={style} />
}

const Category = ({ site })=>{
  let { category } = site
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
    category = [...category, ...cate2]
  }
  return <div>{category.map((c, i)=><p className={styles.tag} key={i}>{c}</p>)}</div>
}

export default ({ data })=><header className={styles.main}>
  <Back />
  <div className={styles.view}>
    <h1 className={styles.name}>
      {data.name}
      {data.owner && <span>{data.owner}</span>}
    </h1>
    {data.close
      ? <p>【本素材站已关站或迁移到了其他地址，若有关于本站的新地址请报告给我们】</p>
      : <Category site={data} />}
  </div>
</header>
