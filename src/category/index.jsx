
import React from 'react'
import { Header, Error, Loading } from '../component'
import { useAPI } from '../common'
import styles from './index.module.css'

const Main = ({ category })=><>{category.map((firstCategory, index)=><div key={index}>
  {firstCategory.name}
  <ul>
    {firstCategory.child.map((secondCategory)=>{
      const categoryName = secondCategory[0]
      return <li><a href={`#!category/${categoryName}`}>{categoryName}</a></li>
    })}
  </ul>
</div>)}</>

const Category = ({ category, list, select })=>{
  const categoryList = category.reduce((p, item)=>p.concat(item.child), [])
  const categoryData = categoryList.find((item)=>item[0] === select)
  if (!categoryData){ return null }
  const itemList = list.filter((item)=>item.category.includes(select))
  console.log(categoryData)
  return <>
    <div>{categoryData[1]}</div>
    <ul>
      {itemList.map((item)=><li key={item.id}>
        <a href={`#!site/${item.id}`} target="_blank" rel="noopener noreferrer">
          {item.name}
        </a>
      </li>)}
    </ul>
  </>
}

const useData = ()=>{
  const site = useAPI('./api/site.json')
  const category = useAPI('./api/page/rule.json')
  if (site.state === 'fail'){
    return { state: 'fail', type: 'site', result: site.result }
  }
  if (category.state === 'fail'){
    return { state: 'fail', type: 'category', result: category.result }
  }
  if (category.state === 'load' || site.state === 'load'){
    return { state: 'load' }
  }
  return {
    state: 'success',
    list: site.result,
    category: category.result,
  }
}
export default ({ category })=>{
  const site = useData()
  return <>
    <Header />
    <div className={styles.body}>
      {site.state === 'fail' && <Error title={`get ${site.type} fail`} error={site.result} />}
      {site.state === 'load' && <Loading />}
      {site.state === 'success' && <>
        {!category && <Main list={site.list} category={site.category} />}
        {category && <Category list={site.list} category={site.category} select={decodeURI(category)} />}
      </>}
    </div>
  </>
}
