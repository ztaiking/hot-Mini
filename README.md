# hot-Mini
一套热更新小程序方案，把小程序代码打包成js代码，然后通过后续js代码引入到小程序端，通过内部实现eval函数可以实现小程序热更新
## 运行代码
- `npm run pack` 打包代码并存入dist目录下
- `npm run watch` 监听文件改动后会自动渲染代码
- `npm run release` 自动化部署代码到服务器上
- `npm run dev:wx` 把代码动态化插入微信小程序模板中
- `npm run dev:uni` 把代码动态化插入uniapp模板中
## debugger代码

## 热更新代码
## todolist
- [x] 5-20实现了watch功能，可以监听小程序文件夹的变动自动重新构建自动渲染更新
- [x] 5-23实现release功能，结合mongodb可以自动化把代码打到后台，实现快速部署,结合了laf
- [x] 6-24优化了webpack打包体积1.3kb->944b，打包前删除掉注释
- [x] 6-24新增了微信小程序和uniapp的模板(render-template)，可以实现这些模板里的动态化
- [x] 模板编译的时候可以实现跨端的想法 （实现了小程序和uniapp的动态化）
- [ ] release的数据不能写死还要搭一个轻量级后台
- [ ] 5-23小程序端读取release后的代码做渲染，实现热更新
- [ ] 能够使用微前端的思想实现和小程序原生代码隔离


## 文件目录
- render-template 模板渲染器
  - wx-render 微信小程序模板渲染器
  - uni-render uniapp 模板渲染器
- src 
  - ast-traverse 实现ast树的转化
  - build 对webpack的bundlejs做剪枝压缩处理
  - encode 压缩编码工具包
  - index 主模块
  - parse 处理wxml
  - release 实现一键发布的工具
  - uniRun 把动态化代码下发到uniapp的模板渲染器
  - wxRun 把动态化代码下发到微信的模板渲染器
  - watch 实现修改代码的动态化更新
- test
  - index.js 
  - index.wxml
  - index.wxss 
- utils 工具包
- env 其他环境配置
- index.ejs 一键发布用到的展示页面模板
- webpack.config.js webpack的配置