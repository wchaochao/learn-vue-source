import { VNodeFlags, ChildrenFlags } from './constants'

// export interface VNode {
//   _isVNode: true,
//   el: Element | null,
//   flags: VNodeFlags,
//   tag: string | FunctionalComponent | ComponentClass | null,
//   data: VNodeData | null,
//   children: VNodeChildren,
//   childFlags: ChildrenFlags
// }

export const Fragment = Symbol('Fragment')
export const Portal = Symbol('Portal')

export function h (tag, data = null, children = null) {
  let flags = null
  if (typeof tag === 'string') {
    flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
  } else if (tag === Fragment) {
    flags = VNodeFlags.FRAGMENT
  } else if (tag === Portal) {
    flags = VNodeFlags.PORTAL
    tag = data && data.target
  } else {
    if (tag !== null && typeof tag === 'object') {
      flags = tag.functional ? VNodeFlags.COMPONENT_FUNCTIONAL : VNodeFlags.COMPONENT_STATEFUL_NORMAL
    } else if (typeof tag === 'function') {
      flags = tag.prototype && tag.prototype.render ? VNodeFlags.COMPONENT_STATEFUL_NORMAL : VNodeFlags.COMPONENT_FUNCTIONAL
    }
  }

  let childFlags = null
  if (children === null) {
    childFlags = ChildrenFlags.NO_CHILDREN
  } else if (children._isVNode) {
    childFlags = ChildrenFlags.SINGLE_VNODE
  } else if (Array.isArray(children)) {
    const length = children.length
    if (length === 0) {
      childFlags = ChildrenFlags.NO_CHILDREN
      children = null
    } else if (length === 1) {
      childFlags = ChildrenFlags.SINGLE_VNODE
      let child = children[0]
      children = child._isVNode ? child : createTextVNode(String(children))
    } else {
      childFlags = ChildrenFlags.KEYED_VNODES
      children = normalizeVNodes(children)
    }
  } else {
    childFlags = ChildrenFlags.SINGLE_VNODE
    children = createTextVNode(String(children))
  }

  return {
    _isVNode: true,
    el: null,
    flags,
    tag,
    data,
    children,
    childFlags,
  }
}

function normalizeVNodes (children) {
  return children.map((item, index) => {
    let child = item._isVNode ? item : createTextVNode(String(item))
    if (child.key == null) {
      child.key = `|${index}`
    }
    return child
  })
}

function createTextVNode (text) {
  return {
    _isVNode: true,
    el: null,
    flags: VNodeFlags.TEXT,
    tag: null,
    data: null,
    children: text,
    childFlags: ChildrenFlags.NO_CHILDREN
  }
}
