
/**遍历 */
const root = 
  {
    name: 'a',
    children: [
      {
        name: 'b',
        children: [
          {
            name: 'c',
          },
          {
            name: 'd',
            children: [
              {
                name: 'e'
              }
            ]
          },
        ]
      },
      {
        name: 'f'
      },
      {
        name: 'g',
        children: [
          {
            name: 'h',
            children: [
              {
                name: 'i'
              }
            ]
          }
        ]
      },
    ]
  }

/**深度优先遍历 */
const deepTraversal = (item, list) => {
  if (item) {
    list.push(item)
    let children = item.children || []
    children.map(v => {
      deepTraversal(v, list)
    })
  }
  return list
}
let list = deepTraversal(root, [])
console.log('test-list', list)


/**广度优先遍历 */
const wideTraversal = (item) => {
  let list = []
  if (item) {
    let queue = []
    queue.unshift(item)
    while(queue.length != 0) {
      let item = queue.pop()
      let children = item.children || []
      children.map(v => {
        list.push(v)
        if (v.children) {
          queue.unshift(v)
        }
      })
    }
    return list
  }
}
const wideList = wideTraversal(root)
console.log('test-wideList', wideList)