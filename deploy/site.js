
const fse = require('fs-extra')
const path = require('path')

module.exports = async (mainPath, ruleData)=>{
  const sitePath = path.join(mainPath, 'site')
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
    if (!config.rule){
      config.rule = []
    }else{
      config.rule = Array.from(new Set(config.rule)).map((ruleID)=>{
        const rule = ruleData[ruleID]
        if (!rule){ throw new Error(`site ${id} rule ${ruleID} missing!`) }
        return { id: ruleID, name: rule.name, image: rule.image }
      })
    }
    if (!config.rule2){ config.rule2 = [] }
    if (!Array.isArray(config.rule2)){ config.rule2 = [config.rule2] }
    if (!config.comment){ config.comment = [] }
    if (!Array.isArray(config.comment)){ config.comment = [config.comment] }
    result.push({
      id,
      name: config.name,
      category: config.category,
      logo: config.logo,
    })
    taskList.push(fse.writeFile(path.join(siteTargetPath, `${id}.json`), JSON.stringify(config)))
  })

  await Promise.all(taskList)
  await fse.writeFile(path.join(targetPath, 'site.json'), JSON.stringify(result))

  const targetMediaPath = path.join(mainPath, 'build/media/site')
  await fse.ensureDir(targetMediaPath)
  await fse.emptyDir(targetMediaPath)
  fse.copy(path.join(mainPath, 'site/media'), targetMediaPath)
}
