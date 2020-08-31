
const fse = require('fs-extra')
const path = require('path')
const { spawn } = require('child_process')

const mainPath = path.join(__dirname, '../')

const gitClone = async ()=>{
  await new Promise((success)=>{
    const command = spawn('git', [
      'clone',
      'https://github.com/miaowm5/rmproject2.git',
      '-b', 'assets',
      '--single-branch',
      '--depth=1',
      'build/assetsTemp',
    ])
    command.stdout.on('data', (data) => { console.log(`git: ${data}`) })
    command.stderr.on('data', (data) => { console.error(`git: ${data}`); })
    command.on('close', (code) => {
      console.log(`git process exited with code ${code}`);
      success()
    })
  })
}

const main = async ()=>{
  await fse.remove(path.join(mainPath, 'build/assetsTemp'))
  await fse.remove(path.join(mainPath, 'build/assets'))
  await gitClone()
  await fse.copy(path.join(mainPath, 'build/assetsTemp/assets'), path.join(mainPath, 'build/assets'))
  await fse.remove(path.join(mainPath, 'build/assetsTemp'))
}

main().catch((e)=>{ console.error(e) })
