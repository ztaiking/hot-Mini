const inlineCss = require('inline-css')
const artTemplate = require('art-template')
const util = require('../utils/index')
const parseHtml = require('./parse')
const astTraverse = require('./ast-traverse')
const fs = require('../utils/fs-async.js')
const encode = require('./encode')
const path = require('path')
const { cwd } = require('node:process')

const args = (util.getOptions(process)).option;
const arg = args?args:"test"
const WXML_PATH = `../${arg}/index.wxml`
const WXSS_PATH = `../${arg}/index.wxss`
const JS_PATH = `../${arg}/index.js`
const root = cwd()
/**
 * 读取文件的函数
 * @param {*} path 文件路径的对象
 */
const readFileFn = async function (paths) {
    let code = {}
    for (let i = 0; i < paths.length; i++) {
        const filePath = paths[i]
        codePath = path.join(root, 'test', filePath)
        const p = filePath.split('.').slice(-1)[0]
        let key =
            p === 'wxml'
                ? 'htmlCode'
                : p === 'js'
                ? 'jsCode'
                : p === 'wxss'
                ? 'cssCode'
                : ''
        let t = await fs.readFile(codePath)
        code[key] = t.toString()
    }
    return code
}

/**
 * 处理代码并且内联css代码到js
 * @param {*} html
 * @param {*} css
 * @returns
 */
const inlineCssFn = async function (html, css) {
    css = css ? css : '.page{ }'
    html = html ? html : '模版错误'
    let options = {
        url: 'index.css'
    }
    html = `<style>${css}</style>${html}`
    const htmlCss = await inlineCss(html, options)
    return htmlCss
}
/**
 * 拼接字符串
 */
const concatStr = (render, jsCode) => {
    console.log(render, jsCode)
    let onload =
        /onLoad:(.*)function(.*)\((.*?)\)(.*){ | (.*)onLoad(.*)\((.*?)\)(.*){/
    let res = jsCode.match(onload)
    if (res) {
        jsCode = jsCode.replace(res[0], res[0] + 'this.setdata()')
    }
    jsCode = jsCode.replace(
        'Page({',
        `var Page = function(page){
        return page
      }
    return Page({
      ${
          res
              ? ''
              : `
      onLoad: function (options) {
        options = this.options;
        this.setdata({})
      },
      `
      }
    setdata: function setdata(dictData) {
      for(var i in dictData){
        this.data[i] = dictData[i]
      }
      const render = ${render};
      var html = render(this.data);
      console.log(html);
      this.setData({html : this.parse(html)});
    },`
    )

    let str = `function runCode(){ ${jsCode} }`
    str = str.replace(/\\n/g, '')
    str = str.replace(/\\"/g, "'")
    str += `module.exports = runCode;`
    return str
}

;(async function init() {
    try {
        const paths = [JS_PATH, WXML_PATH, WXSS_PATH]
        console.log(paths)
        const code = await readFileFn(paths)
        const { htmlCode, cssCode, jsCode } = code
        let htmlCss = await inlineCssFn(htmlCode, cssCode)
        let ast = parseHtml(htmlCss)
        let newHtml = astTraverse(ast)
        let render = artTemplate.compile(newHtml)
        let str = concatStr(render, jsCode)
        str =  util.removeCommentsFromFile(str) // 删除掉注释的内容可以做压缩
        await fs.writeFile('dist/index.js', str, { encoding: 'utf8' })
    } catch (error) {
        console.log(error)
    }
})()
