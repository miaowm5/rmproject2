
const fs = require('fs-extra')
const path = require('path')
const handleRule = require('./rule')
const handleSite = require('./site')

const mainPath = path.join(__dirname, '../../')

const main = async ()=>{
  await fs.emptyDir(path.join(mainPath, 'dist/api'))
  const ruleData = await handleRule(mainPath)
  await handleSite(mainPath, ruleData)
  await fs.copy(path.join(mainPath, 'api/page'), path.join(mainPath, 'dist/api/page'))
}

main().catch((e)=>{ console.error(e); throw e })
