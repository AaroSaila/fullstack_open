import { useState } from 'react'

const Button = (props) => {
  const {text, handler} = props
  return (
    <div>
      <button onClick={handler}>{text}</button>
    </div>
  )
}

const StatisticsLine = (props) => {
  const {text, value} = props
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad, all, average, positive_ratio] = props.stats

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text={"Good"} value={good} />
          <StatisticsLine text={"Neutral"} value={neutral} />
          <StatisticsLine text={"Bad"} value={bad} />
          <StatisticsLine text={"All"} value={all} />
          <StatisticsLine text={"Average"} value={average} />
          <StatisticsLine text={"Positive"} value={positive_ratio.toString().concat(" %")} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = isNaN((good - bad) / all) ? 0 : (good - bad) / all
  const positive_ratio = isNaN(good / all * 100) ? 0 : good / all * 100

  const stats = [good, neutral, bad, all, average, positive_ratio]

  const incrementFeedback = (feedback) => () => {
    switch (feedback) {
      case "good":    setGood(good + 1);       break
      case "neutral": setNeutral(neutral + 1); break
      case "bad":     setBad(bad + 1);         break
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handler={incrementFeedback("good")} />
      <Button text="Neutral" handler={incrementFeedback("neutral")} />
      <Button text="Bad" handler={incrementFeedback("bad")} />
      <Statistics stats={stats} />
    </div>
  )
}

export default App
