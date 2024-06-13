// src/Calculator.js
import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const handleBackspace = useCallback(() => {
    setInput(input.slice(0, -1));
  }, [input]);

  const handleEqual = useCallback(() => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  }, [input]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        setInput((prev) => prev + key);
      } else if (key === 'Enter' || key === '=') {
        handleEqual();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleBackspace, handleClear, handleEqual]);

  const handleClick = (value) => {
    setInput(input + value);
  };

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
