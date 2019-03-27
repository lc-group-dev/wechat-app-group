import wepy from 'wepy'
export async function retryLogin() {
  const res = await wepy.login()
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
  const res = await wepy.login()
  console.log(res)
  if (res.code) {
    const res2 = await wepy.request({
      url: 'https://lc.hellogod.cn/weChat/login',
      method: 'GET',
      data: {
        code: res.code
      }
    })
    wepy.$instance.globalData.token = res2.data.token
    // 0 代表以前没有这个用户信息 1 代表没有绑定 2 代表绑定了
    return res2.data.status
  }
}

export async function storeUserInfo() {
  console.log(wepy.$instance.globalData.userinfo)
  const userinfo = wepy.$instance.globalData.userinfo
  const data = {
    address: wepy.$instance.globalData.leetcodeLink,
    avatarUrl: userinfo.avatarUrl,
    gender: userinfo.gender,
    nick_name: userinfo.nickName,
    phoneNum: '18829589407',
    userName: 'Luther'
  }
  const res = await wepy.request({
    url: 'https://lc.hellogod.cn/weChat/getUserInfo', //开发者服务器接口地址",
    data: data, //请求的参数",
    header: {
      Authorization: wepy.$instance.globalData.token
    },
    method: 'POST',
    dataType: 'json' //如果设为json，会尝试对返回的数据做一次 JSON.parse
  })
  return res
}
