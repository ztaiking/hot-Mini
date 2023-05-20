function runCode(){ //Page Object
var Page = function(page){
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
$out+="<view > sssdsdssssdss </view>"
}catch(error){
throw {name:'RuntimeError',path:null,message:error.message,line:$line[0]+1,column:$line[1]+1,source:"<view > sssdsdssssdss </view>",stack:error.stack}
}
return $out
};
      var html = render(this.data);
      console.log(html);
      this.setData({html : this.parse(html)});
    },
    data: {
        a:1
    },
    //options(Object)
    onLoad: function(options){this.setdata()
        
    },
    onReady: function(){
        
    },
    onShow: function(){
        
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    }

}); }module.exports = runCode;