hanleGetCanvas(index){
  var self = this
  console.log('绘图')
  const query = wx.createSelectorQuery()
  query.select("#canvasId")
		.fields({ node: true, size: false }).exec((res) => {
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    canvas.width = 100
    canvas.height = 100
    self.setData({ drawing: true })
    new Promise(function (resolve) {
      // 绘制背景图片
      wx.getImageInfo({
        src: self.data.posterBg, // 网络图片
        success(res) {
          const img = canvas.createImage()
          img.src = res.path
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 100, 100)
            resolve(true)
          }
        }
      })
    }).then(function () {
      return new Promise(function(resolve){
        // 绘制name
        ctx.font = '500 56px Arial'
        ctx.fillStyle = '#fff'
        ctx.fillText(app.globalData.student.name, 260, 104)
        resolve(true)
      })
    }).then(function () {
      return new Promise(function(resolve){
        // 绘制文字
        ctx.font = '400 40px Arial'
        ctx.fillStyle = '#9A9A9A'
        ctx.fillText('欢迎来到Stark工业联盟～', 256, 176)
        resolve(true)
      })

    }).then(function () {
      return new Promise((resolve)=>{
        let posterimg = self.data.images[index].img
        console.log(index, self.data.images)
        wx.getImageInfo({
          src: posterimg, // 网络图片.海报图片
          success(res) {
            const img = canvas.createImage()
            img.src = res.path
            img.onload = () => {
              ctx.drawImage(img, 36, 244, 1076, 1628)
              resolve(true)
            }
          }
        })
      })

    }).then(function () {
      return new Promise(function(resolve){
        // 获取二维码
        shareQr().then(res=>{
          self.setData({
            base64Qr:'data:image/png;base64,' + res // base64的二维码
          })
          // 绘制二维码
          const qrImg = canvas.createImage()
          qrImg.src = self.data.base64Qr
          qrImg.onload = () => {
            ctx.drawImage(qrImg, 784, 1976, 320, 320)
            resolve(true)
          }
          qrImg.onerror = (err) => {
            console.log(err)
            resolve(true)
          }
        })
      })
    }).then(function () {
      return new Promise(function(resolve){
        // 绘制虚线
        ctx.save()
        ctx.setLineDash([3,6])
        ctx.lineWidth = 4
        ctx.strokeStyle = '#fff'

        ctx.beginPath()
        ctx.moveTo(96, 1936)
        ctx.lineTo(1040, 1936)
        ctx.stroke()
        resolve(true);
      })

    }).then(function () {
      return new Promise(function(resolve){
        // 绘制文字
        ctx.font = '500 56px Arial'
        ctx.fillStyle = '#343434'
        ctx.fillText('超值体验', 63.6, 2108)
        ctx.fillText('元', 480, 2108)
        ctx.font = '500 132px Arial'
        ctx.fillStyle = '#FF7A00'
        ctx.fillText('9.9', 300, 2108)

        ctx.font = '500 56px Arial'
        ctx.fillStyle = '#343434'
        ctx.fillText('体验价值', 63.6, 2276)

        ctx.font = '500 96px Arial'
        ctx.fillStyle = '#FF7A00'
        ctx.fillText('299', 300, 2276)

        ctx.font = '500 56px Arial'
        ctx.fillStyle = '#343434'
        ctx.fillText('元的直播课程', 460, 2276)

        resolve(true)
      })

    }).then(function () {
      return new Promise(function(resolve){
        // 设置直线的颜色
        ctx.save()
        ctx.beginPath()
        ctx.setLineDash([3,0])
        ctx.strokeStyle = '#FF7A00'
        ctx.moveTo(300, 2240)
        // 设置直线的终点坐标
        ctx.lineTo(460, 2240)
        // 设置直线的粗细
        ctx.lineWidth = '4'
        // 设置直线两端的样式（线帽） butt | round | square
        ctx.lineCap = 'round'
        // 绘制线条（通过描边的方式绘制图形）
        ctx.stroke()
        ctx.restore()
        resolve(true)
      })

    }).then(function () {
      // 绘制头像
      return new Promise(function(resolve){ // 绘制头像圆形边框
        let avatar = app.globalData.student.avatar || app.oss_pic_prefix_url + "/wechat/static/student.png"
        wx.getImageInfo({
          src: avatar, // 网络图片
          success(res) {
            const avatarImg = canvas.createImage()
            avatarImg.src = res.path
            avatarImg.onload = () => {
              ctx.save()
              ctx.beginPath()
              ctx.arc(124, 116, 80, 0, Math.PI * 2, false)
              ctx.clip()
              ctx.drawImage(avatarImg, 44, 36, 160, 160)
              ctx.restore()
              // console.log('绘制头像')
              resolve(true)
            }
          }
        })
      })
    }).then(function () {
      return new Promise(function(resolve){
        // console.log('绘制完毕，转换成图片')
        self.transferCanvasToImage(canvas, index)
        resolve(true)
      })

    }).catch((err) => {
      console.log(err)
      self.setData({ drawing: false })
      self.data.loading && wx.hideLoading()
    })
  })
}
