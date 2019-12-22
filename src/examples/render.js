import { h } from '../vnode/index'
import { render } from '../vnode/render'

const elementVNode = h('div', {
    style: {
      width: '100px',
      height: '100px',
      background: 'red'
    }
  }, h('div', {
    style: {
      width: '50px',
      height: '50px',
      background: 'green'
    }
  })
)

render(elementVNode, document.getElementById('app'))
