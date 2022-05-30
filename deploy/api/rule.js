
const fse = require('fs-extra')
const path = require('path')

// 获取 api/rule 目录下的所有文件
const getRuleData = async (mainPath)=>{
  const rulePath = path.join(mainPath, 'api/rule')
  const result = {}
  const fileList = await fse.readdir(rulePath)
  fileList.forEach((filename)=>{
    if (!filename.endsWith('.json')) return
    const id = filename.slice(0, filename.length - 5) - 0
    if (!id) return
    const config = JSON.parse(fse.readFileSync(path.join(rulePath, filename)).toString())
    config.id = id
    result[id] = config
  })
  return result
}

// 将规约的简化数据储存到 build/api/rule.json 中，供前端规约一览界面使用
const saveBriefRule = async (mainPath, ruleData)=>{
  await fse.writeFile(path.join(mainPath, 'build/api/rule.json'), JSON.stringify(ruleData))
}

// 将单独的规约数据储存到 build/api/rule 目录下，会对规约的 detail 属性进行解析
const saveSingleRule = async (mainPath, ruleData)=>{
  const targetPath = path.join(mainPath, 'build/api/rule')
  await fse.ensureDir(targetPath)
  await fse.emptyDir(targetPath)
  const taskList = []
  Object.keys(ruleData).forEach((id)=>{
    const data = ruleData[id]
    data.detailParse = []
    data.detail.forEach((detail)=>{
      if (detail.type !== 'rule'){ return data.detailParse.push(detail) }
      const ruleID = detail.param[0]
      const rule = ruleData[detail.param[0]]
      if (!rule){ throw new Error(`detail ${id} rule ${detail.param[0]} missing!`) }
      const type = detail.param[1] || 'all'
      if (type === 'link'){
        data.detailParse.push({ type: 'link', param: [rule.name, `#!rule/${ruleID}`] })
      }else if (type === 'image'){
        data.detailParse.push({ type: 'ruleImage', param: [ruleID, rule.name, rule.image] })
      }else if (type === 'all'){
        data.detailParse.push({ type: 'ruleImage', param: [ruleID, rule.name, rule.image] })
        data.detailParse = data.detailParse.concat(rule.detail)
      }
    })
    taskList.push(fse.writeFile(path.join(targetPath, `${id}.json`), JSON.stringify(data)))
  })
  await Promise.all(taskList)
  return ruleData
}

const main = async (mainPath)=>{
  const ruleData = await getRuleData(mainPath)
  await saveBriefRule(mainPath, ruleData)
  await saveSingleRule(mainPath, ruleData)
  return ruleData
}

module.exports = main
