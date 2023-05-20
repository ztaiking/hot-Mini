const fs = require('fs');
const { exec } = require('child_process');
const ProgressBar = require('progress');
const util = require('../utils/index');
// 创建进度条
const bar = new ProgressBar(':bar :percent', { total: 0});

// 防抖函数
function debounce(fn, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

// 读取配置终端中的参数
const args = process.argv.slice(2);
// 监听文件夹中的文件夹文件的变化
const arg =  args[0]? args[0]:'test'
try{
  fs.watch(`./${arg}`, debounce(async function (eventType, filename) {
    console.log(`File ${filename} ${eventType}修改`);
    console.log('正在打包中...');
    // 显示进度条
    bar.tick();
    // 执行打包命令
    await exec(`npm run pack -- --option=${arg}`, (error, stdout) => {
      if (!error) {
        console.log(stdout);
      } else {
        console.log('监听执行报错' + error);
      }
    });
  }), 500);
}catch(e){
  console.error("选用的路径错误")
}