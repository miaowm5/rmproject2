
const fse = require('fs-extra')
const path = require('path')
const getRuleData = require('./getRuleData')
const handleRule = require('./rule')
const handleSite = require('./site')

const mainPath = path.join(__dirname, '../')

const main = async ()=>{
  await fse.emptyDir(path.join(mainPath, 'build'))
  const ruleData = await getRuleData(mainPath)
  await handleRule(mainPath, ruleData)
  await handleSite(mainPath, ruleData)
  fse.copy(path.join(mainPath, 'page'), path.join(mainPath, 'build/page'))
}

main().catch((e)=>{ console.error(e) })
