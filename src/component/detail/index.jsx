
import React from 'react'

const Text = ({ param })=><>{param[0] ? <p>{param[0]}</p> : <br />}</>

const Link = ({ param })=>{
  const name = param[0]
  let url = param[1]
  if (!name){ return null }
  if (!url){ url = name }
  return <p><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></p>
}

const List = ({ param })=><ul>
  {param.map((content, key)=><li key={key}>{content}</li>)}
</ul>

const RuleImage = ({ param })=><p><a href={`#!rule/${param[0]}`}>
  <img alt={param[1]} src={`./media/rule/${param[2]}.jpg`} />
</a></p>

const Main = ({ content })=>{
  if (!content || !Array.isArray(content)){ return null }
  return <>{content.map((line, key)=>{
    if (!line){ return null }
    const { type } = line
    const param = line.param || []
    if (type === 'text'){ return <Text key={key} param={param} /> }
    if (type === 'link'){ return <Link key={key} param={param} /> }
    if (type === 'list'){ return <List key={key} param={param} /> }
    if (type === 'ruleImage'){ return <RuleImage key={key} param={param} /> }
    return <p key={key}>Unknow type: {type}</p>
  })}</>
}

export default Main
