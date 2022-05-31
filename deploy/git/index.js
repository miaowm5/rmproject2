
require('dotenv').config()
const path = require('path')
const fs = require('fs-extra')
const getRemoteURL = require('./remoteUrl')
const git = require('./git')
const updateAssets = require('./assets')

const dirname = path.join(__dirname, '../../dist')
const branch = 'gh-pages'

const update = async (oldDir, newDir)=>{
  // 更新二进制数据
  if (process.env.DEPLOY_TYPE === 'ASSETS'){
    await updateAssets(newDir)
    return
  }
  // 更新前端数据
  if (process.env.DEPLOY_TYPE === 'FRONTEND'){
    // 用前端打包的文件覆盖所有内容
    await fs.emptyDir(newDir)
    await fs.copy(path.join(dirname, 'frontend'), newDir)
    // 保留 assets 和 api 文件夹
    await fs.copy(path.join(oldDir, 'assets'), path.join(newDir, 'assets'))
    await fs.copy(path.join(oldDir, 'api'), path.join(newDir, 'api'))
    return
  }
  // （默认）更新后端 API
  await fs.emptyDir(path.join(newDir, 'api'))
  await fs.copy(path.join(dirname, 'api'), path.join(newDir, 'api'))
}

const main = async ()=>{
  await fs.emptyDir(path.join(dirname, './branch'))

  const oldDir = path.join(dirname, './branch/old')
  const newDir = path.join(dirname, './branch/new')
  await fs.ensureDir(oldDir)
  await fs.ensureDir(newDir)

  const remoteURL = getRemoteURL()

  // 将当前的分支内容拉取到 oldDir
  process.chdir(oldDir)
  await git(['clone', remoteURL, '-b', branch, '--single-branch', '--depth=1', '.'])
  await fs.remove(path.join(oldDir, '.git'))

  // 创建一个空的分支到 newDir
  process.chdir(newDir)
  await git(['init'])
  await git(['checkout', '--orphan', branch])

  // 将上一次的提交结果拷贝到 newDir
  await fs.copy(oldDir, newDir)

  // 根据本次的生成结果更新 newDir
  await update(oldDir, newDir)

  // 将 newDir 的内容强制推送到目标分支
  process.chdir(newDir)
  await git(['config', 'user.name', 'GitHub'])
  await git(['config', 'user.email', 'noreply@github.com'])
  await git(['add', '--all', '.'])
  const author = 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>'
  await git(['commit', '--author', author, '--message', 'Deploy to GitHub pages'])
  await git(['push', '--quiet', '--force', remoteURL, branch])
}

main().catch((e)=>{ console.error(e); throw e })
