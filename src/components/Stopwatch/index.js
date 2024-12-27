import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 0,
      isRunning: false,
    }
    this.timerID = null
  }

  componentWillUnmount() {
    // Clear interval when component is removed from DOM
    if (this.timerID) {
      clearInterval(this.timerID)
    }
  }

  tick = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  startButton = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.timerID = setInterval(this.tick, 1000) // Increment every second
      this.setState({isRunning: true})
    }
  }

  stopButton = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.timerID)
      this.timerID = null
      this.setState({isRunning: false})
    }
  }

  resetButton = () => {
    clearInterval(this.timerID)
    this.timerID = null
    this.setState({timer: 0, isRunning: false})
  }

  formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(remainingSeconds).padStart(2, '0')
    return `${paddedMinutes}:${paddedSeconds}`
  }

  render() {
    const {timer} = this.state
    const formattedTime = this.formatTime(timer)

    return (
      <div className="bg">
        <h1 className="main-heading">Stopwatch</h1>
        <div className="main">
          <div className="timer-side">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              className="stopwatch-img"
              alt="stopwatch"
            />
            <p className="heading">Timer</p>
          </div>
          <h1 className="heading">{formattedTime}</h1>
          <div className="side">
            <button
              className="start-btn"
              type="button"
              onClick={this.startButton}
            >
              Start
            </button>
            <button
              className="stop-btn"
              type="button"
              onClick={this.stopButton}
            >
              Stop
            </button>
            <button
              className="reset-btn"
              type="button"
              onClick={this.resetButton}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
