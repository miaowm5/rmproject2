
const fse = require('fs-extra')
const path = require('path')

const mainPath = path.join(__dirname, '../')
const rulePath = path.join(mainPath, 'rule')

const main = async ()=>{
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

  const targetPath = path.join(mainPath, 'build/api')
  await fse.ensureDir(targetPath)
  await fse.writeFile(path.join(targetPath, 'rule.json'), JSON.stringify(result))

  const targetMediaPath = path.join(mainPath, 'build/media/rule')
  await fse.ensureDir(targetMediaPath)
  fse.copy(path.join(mainPath, 'rule/media'), targetMediaPath)
}

main().catch((e)=>{ console.error(e) })
