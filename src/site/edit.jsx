
import React, { useState, useCallback } from 'react'
import styles from './edit.module.css'

const Input = ({ title, value, onChange })=><div>
  <div className={styles.inputTitle}>{title}</div>
  <input className={styles.input} type="text" value={value || ''} onChange={(e)=>onChange(e.target.value)} />
</div>

const ListInput = ({ title, value, placeholder, onChange }) => {
  const items = (typeof value === 'string'
    ? value.split(/[,，]/)
    : (value || []))
    .filter((id) => id);
  const [list, setList] = useState(items)

  const addItem = (event) => {
    const text = event.target.value.replace(/[,，]/, '')
    if (text !== '') {
      setList((oldList) => {
        const newList = [...oldList, text]
        onChange(newList)
        return newList
      })
    }
    event.target.value = ''
  }

  const removeItem = (index) => {
    setList((oldList) => {
      const newList = [...oldList.filter((_, i) => i !== index)]
      onChange(newList)
      return newList
    })
  }

  const onKeyUp = (event) => {
    if (event.key.match(/Enter|[,，]/)) {
      addItem(event)
    }
  }

  return <div>
    <div className={styles.inputTitle}>{title}</div>
    <div className={`${styles.input} ${styles.inputList}`}>
      {list.map((item, index) => <>
        <span
          key={index}
          className={styles.inputListItem}
          onClick={() => removeItem(index)}
        >{item}</span>
      </>)}
      <input type="text" onKeyUp={onKeyUp} placeholder={placeholder} />
    </div>
  </div>
}

const CheckboxInput = ({ title, value, onChange }) => {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className={`${styles.inputTitle} ${styles.inputCheckbox}`}>
    <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
    <span>{title}</span>
  </label>
}

const Main = ({ closeEdit, data: originData })=>{
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
  return <>
    <div className={styles.button} onClick={closeEdit}>放弃编辑</div>
    {edit && <>
      <Input title="站长" value={data.owner} onChange={(v)=>update('owner', v)} />
      <Input title="站点地址" value={data.url} onChange={(v)=>update('url', v)} />
      <Input title="素材地址" value={data.url2} onChange={(v)=>update('url2', v)} />
      <Input title="规约原文" value={data.url3} onChange={(v)=>update('url3', v)} />
      <ListInput title="语言" value={data.language} onChange={(v)=>update('language', v)} placeholder="输入逗号或回车以确认" />
      <ListInput title="站点分类" value={data.category} onChange={(v)=>update('category', v)} placeholder="输入逗号或回车以确认" />
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
        href={`${process.env.REACT_APP_SITE_REPO_URL}/edit/master/site/${originData.id}.json`}
        target="_blank"
        rel="noopener noreferrer"
      >提交到 Github</a>
    </>}
  </>
}

const Button = ({ openEdit })=><div className={styles.button} onClick={openEdit}>编辑文章</div>

export default { Main, Button }
