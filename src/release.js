// 这一步用于发版，把动态js编译后的内容放到服务器
// 这里结合we校园业务 我期望npm run release [options] 
// 例如 npm run release -广东石油化工学院 -页面key 
//npm run release 需要在打包之后才能执行
// 用laf调用
const { Cloud } = require("laf-client-sdk");
const fs = require("fs");
//  获取当前的时间戳
const time = new Date().getTime()
// 获取当前版本号
// 获取打包后的代码
const js_code = fs.readFileSync("dist/index.js","utf-8").toString()
const app_id = 'uxcsf1';
console.log(app_id)
const cloud = new Cloud({
  baseUrl: `https://${app_id}.laf.run`, // 这个地址可以在欢迎页面中的“服务地址”中找到
  getAccessToken: () => "", // 这里不需要授权，先填空
});
//  这一步是看看是什么学校
cloud.invokeFunction("jsRelease",{
    school:"广东石油化工学院",
    pages: {
        "key": "pages1",
        "value": js_code
      },
    time
}).then(res=>{
    console.log(res)
}).catch(e=>{
    console.log(e)
})
// console.log(ret)
 