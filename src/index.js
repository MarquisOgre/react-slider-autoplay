import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import data from './data'
import './styles.css'

function App() {
  const [rows, set] = useState(data)
  useEffect(() => void setInterval(() => set(ScrollContainers), 2000), [])

  let width = 0
  const transitions = useTransition(
    rows.map(data => ({ ...data, y: (width += data.width) - data.width })),
    d => d.name,
    {
      from: { opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ y, height, width }) => ({ y, height, width, opacity: 1 }),
      update: ({ y, height, width }) => ({ y, width, height })
    }
  )

  return (
    <div className="list">
      {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
        <animated.div
          key={key}
          className="card"
          style={{ zIndex: data.length - index, transform: y.interpolate(y => `translate3d(${y}px,0,0)`), ...rest }}>
          <div className="cell">
            <div className="details" style={{ backgroundImage: item.css }} />
          </div>
        </animated.div>
      ))}
    </div>
  )
}

function ScrollContainers(props) {
  let newArray = array_move(props)
  return newArray
}

function array_move(array) {
  const arr = [...array]
  let old_index = 0
  let new_index = arr.length - 1
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr
}

render(<App />, document.getElementById('root'))
