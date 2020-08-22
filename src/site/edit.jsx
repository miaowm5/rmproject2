
import React, { useState, useCallback } from 'react'
import styles from './edit.module.css'

const Input = ({ title, value, onChange })=><div>
  <div className={styles.inputTitle}>{title}</div>
  <input className={styles.input} type="text" value={value || ''} onChange={(e)=>onChange(e.target.value)} />
</div>

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
