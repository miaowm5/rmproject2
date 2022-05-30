
const fse = require('fs-extra')
const path = require('path')
const handleRule = require('./rule')
const handleSite = require('./site')

const mainPath = path.join(__dirname, '../')

const main = async ()=>{
  await fse.emptyDir(path.join(mainPath, 'build/api'))
  const ruleData = await handleRule(mainPath)
  await handleSite(mainPath, ruleData)
  fse.copy(path.join(mainPath, 'page'), path.join(mainPath, 'build/api/page'))
}

main().catch((e)=>{ console.error(e) })
