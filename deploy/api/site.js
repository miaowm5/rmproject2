
const fse = require('fs-extra')
const path = require('path')

// 解析规约数据
const handleRule = (config, siteID, ruleData)=>{
  if (!config.rule){ config.rule = [] }
  if (!config.rule2){ config.rule2 = [] }
  if (!Array.isArray(config.rule2)){ config.rule2 = [config.rule2] }
  const ruleBasic = Array.from(new Set(config.rule)).map((ruleID)=>{
    const rule = ruleData[ruleID]
    if (!rule){ throw new Error(`site ${siteID} rule ${ruleID} missing!`) }
    return {
      type: 'ruleImage',
      param: [ruleID, rule.name, rule.image],
    }
  })
  return ruleBasic.concat(config.rule2)
}

const main = async (mainPath, ruleData)=>{
  const sitePath = path.join(mainPath, 'api/site')
  const targetPath = path.join(mainPath, 'build/api')
  const siteTargetPath = path.join(targetPath, 'site')
  await fse.ensureDir(siteTargetPath)
  await fse.emptyDir(siteTargetPath)

  const result = []
  const fileList = await fse.readdir(sitePath)
  const taskList = []

  fileList.forEach((filename)=>{
    if (!filename.endsWith('.json')) return
    const id = filename.slice(0, filename.length - 5) - 0
    if (!id) return
    const config = JSON.parse(fse.readFileSync(path.join(sitePath, filename)).toString())
    config.id = id
    config.logo = config.logo || ''
    if (config.logo && !config.logo.includes('.')){ config.logo = `${config.logo}.png` }
    config.language = config.language || '中文'
    if (!Array.isArray(config.language)){ config.language = [config.language] }
    config.gfw = Boolean(config.gfw)
    if (!config.url2){ config.url2 = config.url }
    if (!config.url3){ config.url3 = config.url }
    if (!config.urlReg){
      const url = config.url || ''
      config.urlReg = url.replace('https://', '').replace('http://', '').replace(/\./g, '\\.')
    }
    config.ruleParse = handleRule(config, id, ruleData)
    if (!config.comment){ config.comment = [] }
    if (!Array.isArray(config.comment)){ config.comment = [config.comment] }
    result.push({
      id,
      name: config.name,
      category: config.category,
      category2: config.category2,
      close: Boolean(config.close),
    })
    taskList.push(fse.writeFile(path.join(siteTargetPath, `${id}.json`), JSON.stringify(config)))
  })

  // 将单独的站点数据储存到 build/api/site 目录下
  await Promise.all(taskList)

  // 将站点的简化数据储存到 build/api/site.json 中，供前端快速查询
  await fse.writeFile(path.join(targetPath, 'site.json'), JSON.stringify(result))
}

module.exports = main
