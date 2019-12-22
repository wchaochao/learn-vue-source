import { template } from 'lodash'

const MyComponent = props => {
  let compiler
  if (MyComponent.cache) {
    compiler = MyComponent.cache
  } else {
    compiler = MyComponent.cache = template('<h1><%= title %></h1>')
  }
  return compiler(props)
}
MyComponent.cache = null

const html = MyComponent({
  title: 'MyComponent'
})
console.log(html)
