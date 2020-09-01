
const fse = require('fs-extra')
const path = require('path')

module.exports = async (mainPath, ruleData)=>{
  const targetPath = path.join(mainPath, 'build/api/rule')
  await fse.ensureDir(targetPath)
  await fse.writeFile(path.join(mainPath, 'build/api/rule.json'), JSON.stringify(ruleData))
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
}
