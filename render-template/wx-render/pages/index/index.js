const app = getApp()
    Page({
  
      /**
       * 页面的初始数据
       */
      data: {
        html : [{type: 'view', text: '模版错误啦'}],
        
      },
    
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        const {pakoRun:pakoRun} = app.pakoRun
        var args = {
          xxx: 'xxx',
          code:`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`
        }
        if (args) {
          try {
            var onload1 = pakoRun(args, args.code)
            const oD = onload1()
            for(let i in oD){
              this[i] = oD[i]
            }
            this.onLoad(this.options)
          } catch (e) {
            console.log(e)
          }
        }
    
      },
      tychange(typeofData){
        return (typeof typeofData === "object" ? JSON.stringify( typeofData) : typeofData)
      },
      parseTag(tag) {
        let res = {
            type1: "tag",
            name: "",
            voidElement: false,
            // attrs: {},
            children: [],
        };
        let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
        if (tagMatch) {
            // 标签名称为正则匹配的第2项
            res.type1 = tagMatch[1];
            if (tag.charAt(tag.length - 2) === "/") {
                // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
                res.voidElement = true;
            }
        }
        // 匹配所有的标签正则
        let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);
      
        if (classList) {
          let style = ''
            for (let i = 0; i < classList.length; i++) {
                // 去空格再以= 分隔字符串  得到['属性名称','属性值']
       
                let c = classList[i].split("=");
                // c[1] = c[1].replace(/\s*/g, "")
                c[0] = c[0].replace(/\s*/g, "")
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
        return res;
      },
      
      parse(html) {
        var that = this;
        let result = [];
        let current;
        let level = -1;
        let arr = [];
        let tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
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
                    current["text"] = text
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
        // console.log(result)
        return result;
      
      },
    })