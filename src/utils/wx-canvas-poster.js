
// 获取图片信息
const getImageInfo = url => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: resolve,
      fail: reject,
    })
  })
}

const handleBackImage = (obj, canvas, ctx, ratio) => {
	const imageObj = canvas.createImage()
	imageObj.src = obj.background
	imageObj.onload = res => {
		ctx.drawImage(obj.backImage, 0, 0, obj.imgW / ratio, obj.imgH / ratio)
		ctx.fillStyle = 'transparent'
	}
}
const handleImg = (item, ctx, ratio) => {

}

const circleAvatar = (item, ctx, ratio) => {
	ctx.save()
	let r = (item.css.width / 2) || item.css.height / 2
	let d = r * 2
	let cx = item.css.left - r
	let cy = item.css.top - r
	ctx.arc(x, y, r, 0, 2 * Math.PI)
	ctx.strokeStyle = item.css.borderColor || '#fff'
	ctx.stroke()
	ctx.clip()
	ctx.drawImage(item.avatar, cx, cy, d, d)
	ctx.restore()
}

const handleQrCode = (item, ctx, ratio) => {
	ctx.clearRect(item.css.left, item.css.top, item.width, item.height)
}

const handleText = (item, ctx, ratio) => {
	ctx.fillStyle = item.color || '#OOO'
	ctx.textAlign = item.textAlign 'center'
	ctx.textBaseline = item.textBaseline || 'middle'
	ctx.font = item.css.fontSize || 'normal 400 12px PingFangSC-Regular',
	const length = item.text.length
	const setTextLine = () => {
		const chr = item.text.split('')
		let temp = ''
		let row = []
		for (let a = 0; a < chr.length; a++) {
			if (ctx.measureText(temp).width < item.maxWidth) {
			  temp += chr[a]
			} else {
        a--
        row.push(temp)
        temp = ''
      }
		}
		row.push(temp)
		if (row.length > item.row) {
			let rowCut = row.slice(0, item.row)
			let rowPart = rowCut[1]
			let edp = ''
			let emp = []
			for (let t = 0; t < rowPart.length; t++) {
				if (context.measureText(edp).width < 220) {
				  edp += rowPart[a]
				} else { break }
			}
			emp.push(edp)
			let gro = emp[0] + '...'
			rowCut.splice(1, 1, gro)
			row = rowCut
		}
		for (let b = 0; b < row.length; b++) {
		  context.fillText(row[b], item.css.left, item.css.top + b * item.css.top, item.maxWidth)
		}
	}
	ctx.fillText(item.text, item.css.left, item.css.top)
}

export const canvasPoster = (canvasId, painting, cb) => {
	if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) return cb({ type: 'error', msg: '请在微信小程序中打开' })
	const query = wx.createSelectorQuery()
	query.select(`#${canvasId}`).fields({ node: true, size: true }).exec(res => {
		const { node } = res[0]
		if (!node) return cb({ type: 'error', msg: '没有获取到画布内容' })
		const context = node.getContext('2d')
		const dpr = wx.getWindowInfo().pixelRatio
		const width = res[0].width
		const height = res[0].height
		let ratio = dpr * 2
		console.log('dpr',dpr)
		node.width = width * dpr
		node.height = height * dpr
		context.fillStyle = painting.style || 'transparent'
		context.font = painting.font || 'normal 400 12px PingFangSC-Regular',
		// 绘制背景图
		handleBackImage(painting, node, context, ratio)
		const thing = painting.views
		for (let i = 0; i < thing.length; i++) {
			if (thing[i].type === 'text') {
				handleText(thing[i], context, ratio)
			}
			if (thing[i].type === 'img') {
				handleImg(thing[i], context, ratio)
			}
			if (thing[i].type === 'qrCode') {
				handleQrCode(thing[i], context, ratio)
			}
			if (thing[i].type ='avatar') {
				handleCircleAvatar(thing[i], context, ratio)
			}
		}
		
	})
}

