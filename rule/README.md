# 规约列表

本目录下的规约列表通过脚本合并为单个 json 后供前端界面使用

json 以规约 ID 为 key，每个规约包含以下字段

| 字段 | 说明 |
|  -  | -  |
| id | 该规约的唯一 ID<br/>纯数字，自动根据文件名生成 |
| name | 规约名称 |
| image | 规约的图片概览地址，资源放置在 media 文件夹下<br/>可能会用于规约分享等场合，所以请保持此地址不变 |
| detail | 规约详情 |
| detailParse | 预处理的规约详情，由脚本生成，供前端页面使用 |
| hide | 该规约是否隐藏，默认为 false<br/>用来处理已过时、后续不建议继续使用的规约不在规约一览中展示 |

media 文件夹用于放置规约条目用到的图片素材，文件名以规约 ID 打头