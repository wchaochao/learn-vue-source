import { h } from 'snabbdom'

const MyComponent = props => {
  return h('h1', props.title)
}

const vnode = MyComponent({
  title: 'MyComponent'
})
console.log(JSON.stringify(vnode, null, '|-'))
