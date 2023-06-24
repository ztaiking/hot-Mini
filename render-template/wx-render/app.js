// app.js
import pakoRun  from './utils/pakoRun.js'
App({
  onLaunch() {

  },
  pakoRun, // 直接把pakoRun函数引进来
  globalData: {
    userInfo: null
  }
})
