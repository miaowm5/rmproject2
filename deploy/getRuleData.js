
const fse = require('fs-extra')
const path = require('path')

module.exports = async (mainPath)=>{
  const rulePath = path.join(mainPath, 'rule')
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
