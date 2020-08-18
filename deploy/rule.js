
const fse = require('fs-extra')
const path = require('path')

module.exports = async (mainPath, ruleData)=>{
  const targetPath = path.join(mainPath, 'build/api')
  await fse.ensureDir(targetPath)
  await fse.writeFile(path.join(targetPath, 'rule.json'), JSON.stringify(ruleData))

  const targetMediaPath = path.join(mainPath, 'build/media/rule')
  await fse.ensureDir(targetMediaPath)
  await fse.emptyDir(targetMediaPath)
  fse.copy(path.join(mainPath, 'rule/media'), targetMediaPath)
}
