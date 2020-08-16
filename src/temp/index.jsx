
import React from 'react'
import { Header, Error, Loading } from '../component'
import { useAPI, router } from '../common'
import styles from './index.module.css'

const List = ({ data })=><>{data.map((post)=><p key={post.permalink}><a href={`#!temp/${post.permalink}`}>
  {post.title}
</a></p>)}</>

const Content = ({ data, id })=>{
  if (!id){ return null }
  const post = data.find((item)=>item.permalink === id)
  if (!post){ return null }
  return <div dangerouslySetInnerHTML={{ __html: post.content }} /> // eslint-disable-line
}

const Body = ({ data })=>{
  const route = router.useRoute()
  return <div className={styles.main}>
    <div className={styles.list}><List data={data} /></div>
    <div className={styles.content}><Content data={data} id={route.param[0]} /></div>
  </div>
}

export default ()=>{
  const data = useAPI('https://miaowm5.github.io/rmproject/tempData.json')
  return <>
    <Header />
    <div className={styles.body}>
      {data.state === 'fail' && <Error title="get site fail" error={data.result} />}
      {data.state === 'load' && <Loading />}
      {data.state === 'success' && <Body data={data.result} />}
    </div>
  </>
}
