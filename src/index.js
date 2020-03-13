import './css/index.css'
import './css/reset.css'
import image from '@/img/cat.jpeg'
import fn from 'component.js'
fn()
// 将url-loader中的esModule设置为false,即可使用require语句导入图片
// const image = require('../static/img/cat.jpeg')

// 下面代码可以实现HMR 但是会使页面元素增加两次。。。
// if (module && module.hot) {
//   module.hot.accept()
// }

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
ele.className = 'title reset'
ele.innerText = 'hello Webpack df'
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

// 1-3 按钮  动态导入
const btn = document.createElement('button')
// 为什么不安装@babel/plugin-syntax-dynamic-import,不在babelrc中配置它。就可以使用import()语法？甚至结合async和await。
btn.addEventListener('click', async () => {
  // import('./handle').then(({ default: res }) => {
  //   console.log(res.fn())
  // })
  const { default: res } = await import('./handle')
  console.log(res.fn())
})
btn.innerText = 'click'
div.appendChild(btn)

// 1-4 输入框
const input = document.createElement('input')
input.setAttribute('type', 'text')
div.appendChild(input)


document.body.appendChild(div)
