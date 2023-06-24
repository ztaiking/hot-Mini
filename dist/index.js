function runCode(){ var Page = function(page){
        return page
      }
    return Page({
      
    setdata: function setdata(dictData) {
      for(var i in dictData){
        this.data[i] = dictData[i]
      }
      const render = function($data){
'use strict'
$data=$data||{}
var $out='',$line=[0,0]
try{
$out+="<view class='undefined'hover-class='none'hover-stop-propagation='false'> sadasd </view>"
}catch(error){
throw {name:'RuntimeError',path:null,message:error.message,line:$line[0]+1,column:$line[1]+1,source:"<view class='undefined'hover-class='none'hover-stop-propagation='false'> sadasd </view>",stack:error.stack}
}
return $out
};
      var html = render(this.data);
      console.log(html);
      this.setData({html : this.parse(html)});
    },
    data: {
        isTrue: false,
        isTrue2: false,
        isTrue3: true,
        item1: 1,
        item2: 2,
        item3: 3
    },
    onLoad() {this.setdata()
        
        
        console.log(333)
    },
    showdates() {
        console.log('我是showdates函数')
    }
})
 }module.exports = runCode;