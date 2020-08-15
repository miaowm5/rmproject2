
const fse = require('fs-extra')
const path = require('path')
const getRuleData = require('./getRuleData')

const mainPath = path.join(__dirname, '../')

const main = async ()=>{
  const result = await getRuleData()

  const targetPath = path.join(mainPath, 'build/api')
  await fse.ensureDir(targetPath)
  await fse.writeFile(path.join(targetPath, 'rule.json'), JSON.stringify(result))

  const targetMediaPath = path.join(mainPath, 'build/media/rule')
  await fse.ensureDir(targetMediaPath)
  await fse.emptyDir(targetMediaPath)
  fse.copy(path.join(mainPath, 'rule/media'), targetMediaPath)
}

main().catch((e)=>{ console.error(e) })
