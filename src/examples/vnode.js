import { h, Fragment, Portal } from '../vnode/index'

function MyFunctionalComponent () {}

class Component {
  render () {
    throw Error('无render函数')
  }
}

class MyStatefulComponent extends Component {}

const elementVNode = h('div', null, h('span'))
const elementWithTextVNode = h('div', null, '这是文本')
const fragmentVNode = h(Fragment, null, [h('td'), h('td')])
const portalVNode = h(Portal, null, h('h1'))
const functionalVNode = h(MyFunctionalComponent, null, h('div'))
const statefulComponentVNode = h(MyStatefulComponent, null, h('div'))
// console.log(JSON.stringify(elementVNode, null, '|-'))
// console.log(JSON.stringify(elementWithTextVNode, null, '|-'))
// console.log(JSON.stringify(fragmentVNode, null, '|-'))
// console.log(JSON.stringify(portalVNode, null, '|-'))
// console.log(JSON.stringify(functionalVNode, null, '|-'))
console.log(JSON.stringify(statefulComponentVNode, null, '|-'))
