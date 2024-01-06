import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  function isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  };

  function calculateResult(expression: string): number | null {
    try {
      const tokens = expression.match(/[+\-*/]|\d+\.\d+|\d+/g) || [];
      let currentOperator = '+';
      let currentOperand = 0;

      tokens.forEach((token) => {
        if (isOperator(token)) {
          currentOperator = token;
        } else {
          const operand = parseFloat(token);
          switch (currentOperator) {
            case '+':
              currentOperand += operand;
              break;
            case '-':
              currentOperand -= operand;
              break;
            case '*':
              currentOperand *= operand;
              break;
            case '/':
              currentOperand /= operand;
              break;
            default:
              break;
          }
        }
      });

      return currentOperand;
    } catch (error) {
      return null;
    }
  };

  function handleClick(value: string) {
    if (value === '=') {
      const calculatedResult = calculateResult(input);
      setResult(calculatedResult);
    } else if (value === 'C') {
      setInput('');
      setResult(null);
    } else {
      setInput((prevInput: string) => prevInput + value);
    }
  };

  return (
    <div className='App'>
      <div className='calc-display'>
        <input type='type' value={input} readOnly/>
        <div className='result'>{result !== null ? `Result: ${result}` : null}</div>
        <div className='buttons'>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
