import '../static/css/index.css'
import image from '../static/img/cat.jpeg'
// 将url-loader中的esModule设置为false,即可使用require语句导入图片
// const image = require('../static/img/cat.jpeg')
// 1-1
class People {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

const p = new People('yxp')
const name = p.getName()
console.log(name)

const div = document.createElement('div')
// 1-2 css
const ele = document.createElement('p')
ele.className = 'title'
ele.innerText = 'hello Webpack'
div.appendChild(ele)
// 1-3 图片
// console.log(image)
const img = new Image()
img.onload = () => {
  
}
img.width = "400"
img.height = "200"
img.src = image
div.appendChild(img)



document.body.appendChild(div)
