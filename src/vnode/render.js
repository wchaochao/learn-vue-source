import { mount } from './mount'
import { patch } from './patch'

export function render (vnode, container) {
  const preVNode = container.vnode
  if (preVNode == null) {
    if (vnode) {
      mount(vnode, container)
      container.vnode = vnode
    }
  } else {
    if (vnode) {
      patch(preVNode, vnode, container)
      container.vnode = vnode
    } else {
      remove(preVNode, container)
      container.vnode = null
    }
  }
}

function remove (preVNode, container) {
  container.removeChild(preVNode.el)
}
