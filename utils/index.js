function getOptions(process) {
    console.log(process.argv)
    const args = process.argv.slice(2);
    console.log(args)
    const options = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith('--')) {
            const [name, value] = arg.split('=');
            console.log(name,value)
            options[name.slice(2)] = value;
        }
    }
    console.log(options);
    return options
}
function removeCommentsFromFile(content) {
  
    // 使用正则表达式删除注释
    const cleanedContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  
    // 将删除注释后的内容写回文件
    return cleanedContent
  }
  
module.exports = {
    getOptions,
    removeCommentsFromFile
}