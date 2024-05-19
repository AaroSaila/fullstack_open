import { useState } from "react"

const App = function () {
  const [counter, setCounter] = useState(0)

  function plusClick() {
    console.log("clicked")
    setCounter(counter + 1)
  }

  function minusClick() {
    console.log("minus")
    setCounter(counter -1)
  }

  function zeroClick() {
    console.log("zeroed")
    setCounter(0)
  }
  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={plusClick}>
        plus
      </button>
      <button onClick={minusClick}>
        minus
      </button>
      <button onClick={zeroClick}>
        zero
      </button>
    </div>
  )
}

export default App
