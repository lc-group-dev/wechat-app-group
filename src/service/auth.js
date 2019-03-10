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

export async function getLoginInfo() {
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
    // 0 代表以前没有这个用户信息 1 代表没有绑定 2 代表绑定了
    return res2.data.state
  }
}

export async function storeUserInfo(userinfo) {
  const res = await wepy.request({
    url: 'url', //开发者服务器接口地址",
    data: 'data', //请求的参数",
    method: 'POST',
    dataType: 'json' //如果设为json，会尝试对返回的数据做一次 JSON.parse
  })
  return res
}

function login() {
  return new Promise((reslove, reject) => {
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
