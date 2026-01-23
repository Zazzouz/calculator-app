import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  const handleNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(num)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperator = (op) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
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
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className={`operator ${operator === '/' ? 'active' : ''}`} onClick={() => handleOperator('/')}>÷</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>

        <button className={`operator ${operator === '*' ? 'active' : ''}`} onClick={() => handleOperator('*')}>×</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>

        <button className={`operator ${operator === '-' ? 'active' : ''}`} onClick={() => handleOperator('-')}>−</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>

        <button className={`operator ${operator === '+' ? 'active' : ''}`} onClick={() => handleOperator('+')}>+</button>
        <button className="zero" onClick={() => handleNumber('0')}>0</button>
        <button onClick={handleDecimal}>.</button>

        <button className="clear" onClick={handleClear}>C</button>
        <button className="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}

export default App
