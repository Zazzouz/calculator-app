import { useState } from 'react'
import './App.css'

const OP_SYMBOLS = { '+': '+', '-': '−', '*': '×', '/': '÷' }

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)
  const [history, setHistory] = useState([])

  const handleNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(num)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const addToHistory = (first, second, op, result) => {
    if (result === 'Error') return
    const symbol = OP_SYMBOLS[op] ?? op
    setHistory((prev) => [{ expression: `${first} ${symbol} ${second}`, result }, ...prev])
  }

  const handleOperator = (op) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      addToHistory(firstOperand, inputValue, operator, result)
      setFirstOperand(result)
    }

    setWaitingForSecond(true)
    setOperator(op)
  }

  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return second !== 0 ? first / second : 'Error'
      default:
        return second
    }
  }

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(display)
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      addToHistory(firstOperand, inputValue, operator, result)
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecond(false)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className="app-layout">
      <div className="calculator">
        <div className="display" data-testid="display">{display}</div>
        <div className="buttons">
        <button className={`operator ${operator === '/' ? 'active' : ''}`} onClick={() => handleOperator('/')} data-testid="op-divide">÷</button>
        <button onClick={() => handleNumber('7')} data-testid="num-7">7</button>
        <button onClick={() => handleNumber('8')} data-testid="num-8">8</button>
        <button onClick={() => handleNumber('9')} data-testid="num-9">9</button>

        <button className={`operator ${operator === '*' ? 'active' : ''}`} onClick={() => handleOperator('*')} data-testid="op-multiply">×</button>
        <button onClick={() => handleNumber('4')} data-testid="num-4">4</button>
        <button onClick={() => handleNumber('5')} data-testid="num-5">5</button>
        <button onClick={() => handleNumber('6')} data-testid="num-6">6</button>

        <button className={`operator ${operator === '-' ? 'active' : ''}`} onClick={() => handleOperator('-')} data-testid="op-subtract">−</button>
        <button onClick={() => handleNumber('1')} data-testid="num-1">1</button>
        <button onClick={() => handleNumber('2')} data-testid="num-2">2</button>
        <button onClick={() => handleNumber('3')} data-testid="num-3">3</button>

        <button className={`operator ${operator === '+' ? 'active' : ''}`} onClick={() => handleOperator('+')} data-testid="op-add">+</button>
        <button className="zero" onClick={() => handleNumber('0')} data-testid="num-0">0</button>
        <button onClick={handleDecimal} data-testid="decimal">.</button>

        <button className="clear" onClick={handleClear} data-testid="clear">C</button>
        <button className="equals" onClick={handleEquals} data-testid="equals">=</button>
      </div>
      </div>

      <aside className="history-panel" data-testid="history">
        <h2 className="history-title">History</h2>
        <ul className="history-list">
          {history.length === 0 ? (
            <li className="history-empty">No calculations yet</li>
          ) : (
            history.map((entry, i) => (
              <li key={i} className="history-item" data-testid="history-item">
                <span className="history-expression">{entry.expression}</span>
                <span className="history-result">= {entry.result}</span>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  )
}

export default App
