
const fse = require('fs-extra')
const path = require('path')
const http = require('http')
const fs = require('fs')

const mainPath = path.join(__dirname, '../')

const download = async (url, filename)=>{
  console.log(`Download ${filename} from ${url}`)
  const dest = path.join(mainPath, './build/assets/assets', filename)
  await fse.ensureDir(path.dirname(dest))
  const file = fs.createWriteStream(dest)
  await new Promise((success, fail)=>{
    http.get(url, (response)=>{
      response.pipe(file)
      file.on('finish', ()=>{ file.close(success) })
    }).on('error', (err)=>{
      fs.unlink(dest)
      fail(err)
    })
  })
}

const getFileList = async (root, dir)=>{
  const fileList = await fse.readdir(path.join(root, dir))
  let result = []
  const promises = fileList.map((file)=>{
    const handleFile = async ()=>{
      const filePath = path.join(dir, file)
      const stat = await fse.stat(path.join(root, filePath))
      if (stat.isFile()){
        result = result.concat(filePath)
      }else{
        const childFile = await getFileList(root, filePath)
        result = result.concat(childFile)
      }
    }
    return handleFile()
  })
  await Promise.all(promises)
  return result
}

const main = async ()=>{
  const current = JSON.parse((await fse.readFile(path.join(mainPath, './build/assets/assets.json'))).toString())
  const latest = JSON.parse((await fse.readFile(path.join(mainPath, 'assets.json'))).toString())
  const update = []
  Object.keys(latest).forEach((file)=>{
    if (current[file] !== latest[file]){
      update.push(download(latest[file], file))
    }
  })
  const fileList = await getFileList(path.join(mainPath, './build/assets/assets'), '.')
  fileList.forEach((file)=>{
    if (latest[file.replace(/\\/g, '/')] === undefined){
      console.log(`Remove ${file}`)
      update.push(fse.remove(path.join(mainPath, './build/assets/assets', file)))
    }
  })
  if (update.length > 0){
    await Promise.all(update)
    fse.copy(path.join(mainPath, 'assets.json'), path.join(mainPath, './build/assets/assets.json'))
  }else{
    fse.remove(path.join(mainPath, './build/assets'))
  }
}

main().catch((e)=>{ console.error(e) })
