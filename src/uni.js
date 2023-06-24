// 这一步我想实现把解析的数据放在vue3的uniapp编译
const fs = require("fs");

fs.readFile("dist/index.json", (err, buffer) => {
    let strCode = buffer.toString();
    let str = `
    <template>
        <templateCom :data="html" :dataInfo="dataInfo"></templateCom>
    </template>

    <script>
    import { onLoad, onReady } from "@dcloudio/uni-app";
    import { ref, getCurrentInstance } from "vue";
    import templateCom from "../../components/template.vue";
	import bus from "./mitt.js"
    export default {
        components: {
            templateCom,
        },
        setup() {
            let html = ref([]);
            let dataInfo = ref({});
            let { proxy } = getCurrentInstance();
            let _this = proxy
            const tychange = (typeofData) => {
                return typeof typeofData === "object"
                    ? JSON.stringify(typeofData)
                    : typeofData;
            };
    
            const parseTag = (tag) => {
                let res = {
                    type1: "tag",
                    name: "",	
                    voidElement: false,
                    // attrs: {},
                    children: [],
                };
                let tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
                if (tagMatch) {
                    // 标签名称为正则匹配的第2项
                    res.type1 = tagMatch[1];
                    if (tag.charAt(tag.length - 2) === "/") {
                        // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
                        res.voidElement = true;
                    }
                }
                // 匹配所有的标签正则
                let classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);
                
                if (classList) {
                    let style = ''
                    for (let i = 0; i < classList.length; i++) {
                        // 去空格再以= 分隔字符串  得到['属性名称','属性值']
                
                        let c = classList[i].split("=");
                        // c[1] = c[1].replace(/\\s*/g, "")
                        c[0] = c[0].replace(/\\s*/g, "")
                        // 循环设置属性
                        var lengthc = 2
                        for(lengthc; lengthc < c.length ; lengthc++){
                            c[1] += "=" + c[lengthc]
                        }
                        let p = c[1].substring(1, c[1].length - 1)
                        try{
                            p = JSON.parse(c[1].substring(1, c[1].length - 1))
                        }catch(e){
                            
                        }
                
                        if (c[1]) {
                            if(c[0] === ' style'){
                            style = p + style
                            res[c[0]] = style
                            }else{
                            res[c[0]] = p
                            }
                    
                        };
                
                    }
                }
                console.log(JSON.parse(JSON.stringify(res, null, 2)));
                return res;
            };
    
            const parse = (html) => {
                var that = _this;
                let result = [];
                let current;
                let level = -1;
                let arr = [];
                let tagRE =
                /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
                html.replace(tagRE, function (tag, index) {
                    // 判断第二个字符是不是'/'来判断是否open
                    let isOpen = tag.charAt(1) !== "/";
                    // 获取标签末尾的索引
                    let start = index + tag.length;
                    // 标签之前的文本信息
                    let text = html.slice(start, html.indexOf("<", start));
    
                    let parent;
                    if (isOpen) {
                        level++;
                        // 设置标签属性
                        current = that.parseTag(tag);
                        // 判断是否为文本信息，是就push一个text children  不等于'  '
                        if (!current.voidElement && text.trim()) {
                            current["text"] = text;
                        }
                        // 如果我们是根用户，则推送新的基本节点
                        if (level === 0) {
                            result.push(current);
                        }
                        // 判断有没有上层，有就push当前标签
                        parent = arr[level - 1];
                        if (parent) {
                            parent.children.push(current);
                        }
                        // console.log(current)
                        arr[level] = current;
                    }
                    // 如果不是开标签，或者是空元素：</div><img>
                    if (!isOpen || current.voidElement) {
                        // level--
                        level--;
                    }
                });
                // console.log(JSON.parse(JSON.stringify(result, null, 2)))
                return result;
            };
            onLoad(() => {
                let {pakoRun} = proxy.$pakoRun;
                // console.log(pakoRun)
                let args = {
                    code: \`${strCode}\`,
                };
                if (args) {
                    try {
                        let onLoad = pakoRun(args, args.code);
                        let method = onLoad();
                        for (const key in method) {
							bus.on(key, (message) => {
								method[key](message)
							
							});
                            _this[key] = method[key];
                        }
                        dataInfo.value = method["data"];
                        _this.onLoad();
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
            return { tychange, parseTag, parse, html,dataInfo };
        },
    };
    </script>

    <style lang="scss" scoped></style>
    `;
    fs.writeFile("../render-template/uniapp-render/pages/index/index.vue", str, (err) => {});
});