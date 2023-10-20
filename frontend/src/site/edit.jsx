
import React, { useState, useCallback } from 'react'
import { useAPI } from '../common'
import styles from './edit.module.css'

const Input = ({ title, value, onChange })=><div>
  <div className={styles.inputTitle}>{title}</div>
  <input className={styles.input} type="text" value={value || ''} onChange={(e)=>onChange(e.target.value)} />
</div>

const ListInput = ({
  title,
  value,
  onChange,
  placeholder = '输入逗号或回车以确认',
  recommands = [],
  allowCustom = true,
  delimiter = /[,，]/,
}) => {
  const items = (typeof value === 'string'
    ? value.split(delimiter)
    : (value || []))
    .filter((id) => id)
    .filter((item, index, self) => self.indexOf(item) === index)
  const [list, setList] = useState(items)

  const addItem = (text) => {
    const newItems = text.split(delimiter)
      .filter((item) => item !== '' && list.indexOf(item) < 0)
    const newList = [...list, ...newItems]
    onChange(newList)
    setList(newList)
  }

  const removeItem = (index) => {
    const newList = [...list.filter((_, i) => i !== index)]
    setList(newList)
    onChange(newList)
  }

  const handleInput = (event) => {
    if (event.key === 'Enter' || event.target.value.match(delimiter)) {
      addItem(event.target.value)
      event.target.value = ''
    }
  }

  const handleBlur = (event) => {
    if (event.target.value){ addItem(event.target.value) }
    event.target.value = ''
  }

  return <div>
    <div className={styles.inputTitle}>{title}</div>
    <div className={`${styles.input} ${styles.inputList}`}>
      {list.map((item, index) => <span
        key={`item-${index}`}
        className={styles.inputListItem}
        onClick={() => removeItem(index)}
      >{item}</span>)}
      {allowCustom
        && <input type="text" onKeyUp={handleInput} onBlur={handleBlur} placeholder={placeholder} />}
    </div>
    {recommands.length > 0 && <div>
      {recommands
        .filter((item) => list.indexOf(item) < 0)
        .map((item, index) => <span
          key={`recommend-${index}`}
          className={`${styles.inputListItem} ${styles.inputListItemRecommend}`}
          onClick={() => addItem(item)}
        >{item}</span>)}
    </div>}
  </div>
}

// eslint-disable-next-line jsx-a11y/label-has-associated-control
const CheckboxInput = ({ title, value, onChange }) => <label className={`${styles.inputTitle} ${styles.inputCheckbox}`}>
  <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
  <span>{title}</span>
</label>

const CategoryInput = ({ value, onChange })=>{
  const { result, state } = useAPI('./api/page/category.json')
  const categories = state === 'success'
    ? result.map(({ child }) => (child || []).map(([name]) => name)).flat()
    : []
  return <ListInput
    title="站点分类"
    value={value}
    onChange={onChange}
    recommands={categories}
    allowCustom={false}
  />
}

export default ({ data: originData })=>{
  const [edit, setEdit] = useState(true)
  const [data, setData] = useState(()=>{
    const delValue = { id: undefined, ruleParse: undefined }
    return { ...originData, ...delValue }
  })
  const update = useCallback((key, value)=>{
    setData((oldData)=>{
      const changeValue = {}
      changeValue[key] = value
      return { ...oldData, ...changeValue }
    })
  }, [])
  return <div className={styles.editBody}>
    {edit && <>
      <Input title="站长" value={data.owner} onChange={(v)=>update('owner', v)} />
      <Input title="站点地址" value={data.url} onChange={(v)=>update('url', v)} />
      <Input title="素材地址" value={data.url2} onChange={(v)=>update('url2', v)} />
      <Input title="规约原文" value={data.url3} onChange={(v)=>update('url3', v)} />
      <ListInput
        title="语言"
        value={data.language}
        onChange={(v)=>update('language', v)}
      />
      <CategoryInput value={data.category} onChange={(v)=>update('category', v)} />
      <CheckboxInput title="是否被墙？" value={data.gfw} onChange={(v)=>update('gfw', v)} />
      <CheckboxInput title="是否关站？" value={data.close} onChange={(v)=>update('close', v)} />
      <br />
      <br />
      <div className={styles.button} onClick={()=>setEdit(false)}>提交修改</div>
    </>}
    {!edit && <>
      <div className={styles.button} onClick={()=>setEdit(true)}>继续编辑</div>
      <textarea
        className={styles.resultText}
        value={JSON.stringify(data, null, 2)}
        onClick={(e)=>e.target.select()}
        readOnly
      />
      <a
        className={styles.button}
        href={`${process.env.VITE_SITE_REPO_URL}/edit/master/site/${originData.id}.json`}
        target="_blank"
        rel="noopener noreferrer"
      >提交到 Github</a>
    </>}
  </div>
}
