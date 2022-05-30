
const fs = require('fs-extra')
const path = require('path')
const http = require('http')
const https = require('https')

const mainPath = path.join(__dirname, '../../')

// 下载指定文件
const download = async (url, dest)=>{
  await fs.ensureDir(path.dirname(dest))
  const file = fs.createWriteStream(dest)
  await new Promise((success, fail)=>{
    const proto = url.startsWith('https:') ? https : http
    proto.get(url, { headers: { 'Cache-Control': 'no-cache' } }, (response)=>{
      response.pipe(file)
      file.on('finish', ()=>{ file.close(success) })
    }).on('error', (err)=>{
      fail(err)
    })
  })
}

// 获取 assets 下的全部文件列表
const getFileList = async (root, dir)=>{
  const fileList = await fs.readdir(path.join(root, dir))
  let result = []
  const promises = fileList.map((file)=>{
    const handleFile = async ()=>{
      const filePath = path.join(dir, file)
      const stat = await fs.stat(path.join(root, filePath))
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

// 根据 assets.json 更新二进制文件
const main = async (newDir)=>{
  const currentPath = path.join(newDir, './assets/assets.json')
  const latestPath = path.join(mainPath, 'assets.json')

  const current = JSON.parse((await fs.readFile(currentPath)).toString())
  const latest = JSON.parse((await fs.readFile(latestPath)).toString())
  await fs.remove(currentPath)

  const update = []
  Object.keys(latest).forEach((file)=>{
    if (current[file] !== latest[file]){
      console.log(`Download ${file} from ${latest[file]}`)
      const dest = path.join(newDir, './assets', file)
      update.push(download(latest[file], dest))
    }
  })
  const fileList = await getFileList(path.join(newDir, './assets'), '.')
  fileList.forEach((file)=>{
    if (latest[file.replace(/\\/g, '/')] === undefined){
      console.log(`Remove ${file}`)
      update.push(fs.remove(path.join(newDir, './assets', file)))
    }
  })
  if (update.length > 0){ await Promise.all(update) }
  await fs.copy(latestPath, currentPath)
}

module.exports = main
