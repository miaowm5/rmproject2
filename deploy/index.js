
const path = require('path')
const getRuleData = require('./getRuleData')
const handleRule = require('./rule')
const handleSite = require('./site')

const mainPath = path.join(__dirname, '../')

const main = async ()=>{
  const ruleData = await getRuleData(mainPath)
  await handleRule(mainPath, ruleData)
  await handleSite(mainPath, ruleData)
}

main().catch((e)=>{ console.error(e) })
