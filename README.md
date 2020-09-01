# RPG 制作大师授权素材推广计划 2.0

![Build API](https://github.com/miaowm5/rmproject2/workflows/Build%20API/badge.svg)
![Build Frontend](https://github.com/miaowm5/rmproject2/workflows/Build%20Frontend/badge.svg?branch=frontend)
![Download Assets](https://github.com/miaowm5/rmproject2/workflows/Download%20Assets/badge.svg)
![Assets Update](https://github.com/miaowm5/rmproject2/workflows/Assets%20Update/badge.svg?branch=assets)

RPG 制作大师授权素材推广计划 2.0 项目，包含前后端所有的数据

## 分支说明

__master__

主分支，储存了所有网站数据和页面数据，通过 github action 生成供前端使用的 api

__frontend__

前端页面分支，基于 react

__gh-pages__

github page 使用的分支，网页的最终文件存放在此处，通过 github action 自动 force 更新。请避免非必要的手动更新

__assets__

媒体等二进制资源使用的分支，根据 master 分支下的 assets.json 自动 force 更新并部署到 gh-pages 供前端网页使用。请避免非必要的手动更新

## 本地开发指南

拷贝项目

```shell
mkdir rmproject2
cd rmproject2
git clone git@github.com:miaowm5/rmproject2.git -b master back
git clone git@github.com:miaowm5/rmproject2.git -b frontend front
```

安装依赖

```shell
cd front
npm install
```

```shell
cd back
npm install
npm run devAssets
# 拉取当前 assets 分支的内容到本地
# 若要更新已有的 assets 可以再次执行本任务
```

开启后台 api 服务

```shell
cd back
npm run devServer
# 将 build 文件夹中的内容映射到 8000 端口，会执行一次 npm run build
# 若要用最新的数据更新可以再次执行 build 任务
```

打开前端网页

```shell
cd front
npm start
# 在 3500 端口打开前端页面，api 和 assets 请求会被反代到 8000 端口
```
