import { VNodeFlags, ChildrenFlags, o } from './constants'

export function mount (vnode, container) {
  const { flags } = vnode
  console.log(VNodeFlags, VNodeFlags.ELEMENT, flags, !!(VNodeFlags.ELEMENT & flags))
  if (flags & VNodeFlags.ELEMENT) {
    console.log('mountElement')
    mountElement(vnode, container)
  } else if (flags & VNodeFlags.COMPONENT) {
    mountComponent(vnode, container)
  } else if (flags & VNodeFlags.TEXT) {
    mountText(vnode, container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    mountText(vnode, container)
  } else if (flags & VNodeFlags.PORTAL) {
    mountPortal(vnode, contianer)
  }
}

function mountElement (vnode, container) {
  const el = document.createElement(vnode.tag)
  vnode.el = el
  const { data, childFlags, children } = vnode

  if (data) {
    for (let key in data) {
      switch (key) {
        case 'style':
          for (let k in data.style) {
            el.style[k] = data.style[k]
          }
          break
      }
    }
  }

  if (childFlags !== ChildrenFlags.NO_CHILDREN) {
    if (childFlags & ChildrenFlags.SINGLE_VNODE) {
      mount(children, el)
    } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
      children.forEach(child => mount(child, el))
    }
  }

  container.appendChild(el)
}
