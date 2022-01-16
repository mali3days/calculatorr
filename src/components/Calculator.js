import React, { createRef, useState } from 'react';
import { Chart } from './Chart';

import { calculate, getPreviousHugeNumber } from '../utils';

export function Calculator() {
  const [value, handleValueChange] = useState('');
  // const [value, handleValueChange] = useState('24+sin(30)'); // 23.01196837590714
  // const [value, handleValueChange] = useState('sin(30)'); // -0.98803162409286
  // const [value, handleValueChange] = useState('2.5244129544236895-3'); // -0.475587045576311
  // const [value, handleValueChange] = useState('0*3-3'); // -3
  // const [value, handleValueChange] = useState('10-12/3+7'); // 13
  // const [value, handleValueChange] = useState('y=sin(x)*3'); // GRAPH
  // const [value, handleValueChange] = useState('y=2+3*x'); // GRAPH
  // const [value, handleValueChange] = useState('0.1+0.2'); // => 0.3
  // const [value, handleValueChange] = useState('(5+8)*3/8+3'); // => 7.875
  // const [value, handleValueChange] = useState('(1+2-3+4)*2'); // => 8
  // const [value, handleValueChange] = useState('(1+2+3+4)*2'); // => 20
  // const [value, handleValueChange] = useState('-11+34+3-4'); // => 22
  // const [value, handleValueChange] = useState('3-2-12+34+3-16/4'); // => 22
  // const [value, handleValueChange] = useState('3-2*(3+4)*2-12+34+(2+1)-16/4'); // => -4
  // const [value, handleValueChange] = useState('3-2*7'); // => -11
  // const [value, handleValueChange] = useState('3-2*(3+4)'); // => -11
  // const [value, handleValueChange] = useState('3*4'); // => 12
  // const [value, handleValueChange] = useState('(1+2)*4'); // => 12
  // const [value, handleValueChange] = useState('12-12-12+2-12'); // => -22

  // PETERS GUESS
  // const [value, handleValueChange] = useState('23245'); // => 22999
  // const [value, handleValueChange] = useState('11235888'); // =>  11235888
  // const [value, handleValueChange] = useState('111110'); // =>  99999
  //   const [value, handleValueChange] = useState('33245'); // =>   29999

  const [chartValue, setChartValue] = useState(value); //
  const [isChartVisible, showChart] = useState(false); // TODO: change back to false
  const [isCalculatorOn, setIsCalculatorOn] = useState(false);

  const outputRef = createRef();
  function calc(e) {
    e.preventDefault();
    if (isCalculatorOn === false) return;

    let { value: val } = e.target.elements['output'];

    val = value.replaceAll(' ', '').trim();
    val = value.replaceAll('--', '+');
    val = value.replaceAll('++', '+');
    val = value.replaceAll('-+', '-');
    val = value.replaceAll('+-', '-');

    if (val.includes('x') && val.includes('y')) {
      showChart(true);
      setChartValue(val);
    } else {
      showChart(false);
      setChartValue('');
      const result = calculate(val);

      handleValueChange(result);
    }
  }

  function turnOn() {
    if (isCalculatorOn) {
      handleValueChange('0');
    } else {
      handleValueChange('0');
      setIsCalculatorOn(true);
    }
    outputRef.current.classList.add('shadowOn');
  }

  function turnOff() {
    setIsCalculatorOn(false);
    showChart(false);
    handleValueChange('');
    outputRef.current.classList.remove('shadowOn');
  }

  function handleKeyPress(e) {
    if (isCalculatorOn === false) return;

    handleValueChange((prevValue) => {
      if (prevValue === '0' && e.target.value !== '.') {
        handleValueChange(e.target.value);
      } else if (
        prevValue[prevValue.length - 1] === '.' &&
        e.target.value === '.'
      ) {
        return;
      } else {
        handleValueChange(prevValue + e.target.value);
      }
    });
  }

  function guessPeterLastNumber() {
    if (isCalculatorOn === false) return;

    const result = getPreviousHugeNumber(value);
    handleValueChange(result);
  }

  return (
    <div>
      <div className="calculator-wrapper">
        <form onSubmit={calc}>
          <div id="calcHousing">
            <div id="note" className="nondisplay">
              &#9834;
            </div>
            <input
              style={{
                pointerEvents: isCalculatorOn ? 'all' : 'none',
                backgroundColor: isCalculatorOn
                  ? 'rgba(244, 254, 5, 0.68)'
                  : null,
              }}
              onFocus={() => {
                if (value === '0') {
                  handleValueChange('');
                }
              }}
              onBlur={() => {
                if (value.trim() === '') {
                  handleValueChange('0');
                }
              }}
              type="text"
              ref={outputRef}
              id="output"
              value={value}
              name="output"
              onChange={({ target }) => handleValueChange(target.value)}
            />
            <div id="line"></div>
            <div id="firstRow">
              <input id="on" type="button" onClick={turnOn} />
              <button
                id="mutePlay"
                type="button"
                onClick={guessPeterLastNumber}
              >
                Peter guess
              </button>
            </div>
            <div id="secondWrap">
              <div id="secondRow">
                <input
                  className="justButton"
                  id="off"
                  value="OFF"
                  type="button"
                  onClick={turnOff}
                />
                <button
                  type="button"
                  className="justButton"
                  value="("
                  onClick={handleKeyPress}
                >
                  (
                </button>
                <button
                  className="justButton"
                  type="button"
                  value=")"
                  onClick={handleKeyPress}
                >
                  )
                </button>
                <button
                  type="button"
                  className="justButton"
                  id="divide"
                  value="/"
                  onClick={handleKeyPress}
                >
                  &#10135;
                </button>
              </div>
              <div id="thirdRow">
                <input
                  className="justButton"
                  id="seven"
                  type="button"
                  value="7"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="eight"
                  type="button"
                  value="8"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="nine"
                  type="button"
                  value="9"
                  onClick={handleKeyPress}
                />
                <button
                  type="button"
                  className="justButton"
                  id="multiply"
                  value="*"
                  onClick={handleKeyPress}
                >
                  &#10005;
                </button>
              </div>
              <div id="fourthRow">
                <input
                  className="justButton"
                  id="four"
                  type="button"
                  value="4"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="five"
                  type="button"
                  value="5"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="six"
                  type="button"
                  value="6"
                  onClick={handleKeyPress}
                />
                <button
                  type="button"
                  className="justButton"
                  id="minus"
                  value="-"
                  onClick={handleKeyPress}
                >
                  &#8212;
                </button>
              </div>
              <div id="fifthRow">
                <input
                  className="justButton"
                  id="one"
                  type="button"
                  value="1"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="two"
                  type="button"
                  value="2"
                  onClick={handleKeyPress}
                />
                <input
                  className="justButton"
                  id="three"
                  type="button"
                  value="3"
                  onClick={handleKeyPress}
                />
                <input
                  id="plus"
                  type="button"
                  value="+"
                  onClick={handleKeyPress}
                />
              </div>
              <div id="sixthRow">
                <input
                  className="justButton"
                  id="zero"
                  type="button"
                  value="0"
                  onClick={handleKeyPress}
                />
                <button
                  className="justButton"
                  id="dot"
                  type="button"
                  value="."
                  onClick={handleKeyPress}
                >
                  .
                </button>
                <input
                  className="justButton"
                  id="equal"
                  type="submit"
                  value="="
                />
              </div>
            </div>
          </div>
        </form>
        {isChartVisible && (
          <div style={{ width: '60%', height: '300px' }}>
            <Chart value={chartValue} />
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: '14px',
          justifyContent: 'space-around',
          marginTop: '30px',
          color: 'rgb(155, 155, 154)',
        }}
      >
        <div>
          Calculator:
          <ol>
            <li>Turn ON the calculator</li>
            <li>Enter/type/paste a value and press "="</li>
            <li>The answer will replace the value</li>
          </ol>
        </div>
        <div>
          Peter numbers:
          <ol>
            <li>Turn ON the calculator</li>
            <li>Enter a value and press "Peter guess"</li>
            <li>The answer will replace the value</li>
          </ol>
        </div>
        <div>
          X/Y graph:
          <ol>
            <li>Turn ON the calculator</li>
            <li>Enter a value with "y" and "x" and press "="</li>
            <li>The answer will be displayed as x/y graph</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
