import wepy from 'wepy'
export async function retryLogin() {
  const res = await login()
  if (res.code) {
    const res2 = await wepy.request({
      url: 'http://ssss',
      method: 'POST',
      data: {
        code: res.code
      }
    })
    this.globalData.token = res2.data.token
  }
}
function login() {
  return Promise((reslove, reject) => {
    wepy.login({
      success: res => {
        reslove(res)
      },
      fail: () => {
        reject(new Error('login Error'))
      },
      complete: () => {}
    })
  })
}
