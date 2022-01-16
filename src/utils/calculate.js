import { Decimal } from 'decimal.js';

// const operatorPrecedence = {
//   //   '(': (a, b) => a * b,
//   //   ')': (a, b) => a * b,
//   '*': (a, b) => a * b,
//   '/': (a, b) => a / b,
//   '+': (a, b) => a + b,
//   '-': (a, b) => a - b,
// };

// const operators = ['+', '-', '*', '/'];

function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function normalizeArray(arr, sign) {
  const { result } = arr.slice().reduce(
    (acc, elem, index) => {
      if (acc.result.length === 0) {
        acc.result.push(elem);
      } else {
        const lastElem = acc.result[acc.result.length -1];

        if (isNumeric(lastElem + elem)) {
          if (acc.operator) {
            acc.result.push(elem);
            acc.operator = false;
          } else {
            acc.result[acc.result.length -1] = lastElem + elem;
          }
        } else {
          acc.operator = true;
          acc.result.push(elem);
        }
      }
      return acc;
    },
    { result: [], operator: false }
  );

  const indexOfSign = result.indexOf(sign);

  return {
    n1: String(Number(result[indexOfSign-1].slice(0, 17))),
    n2: String(Number(result[indexOfSign+1].slice(0, 17))),
    separator: sign,
    oldN1: result[indexOfSign-1],
    oldN2: result[indexOfSign+1],
  };
}

function add(value) {
  value = value.replaceAll('++', '+');
  const {
    n1,
    n2,
    separator,
    oldN1,
    oldN2,
  } = normalizeArray(
    typeof value === 'string' ? value.split('') : value,
    '+'
  );

  let result = Decimal.add(n1, n2);

  const valueToReplace = `${oldN1}${separator}${oldN2}`;
  result = value.replace(valueToReplace, result);

  return result;
}

function multiply(value) {
  const {
    n1,
    n2,
    separator,
    oldN1,
    oldN2,
  } = normalizeArray(
    typeof value === 'string' ? value.split('') : value,
    '*'
  );

  let result = Decimal.mul(n1, n2);
  const valueToReplace = `${oldN1}${separator}${oldN2}`;
  result = value.replace(valueToReplace, result);

  return result;
}

function divide(value) {
  const {
    n1,
    n2,
    separator,
    oldN1,
    oldN2,
  } = normalizeArray(
    typeof value === 'string' ? value.split('') : value,
    '/'
  );

  if (n2 === "0") {
    // TODO: show error: Division by zero is an illegal operation
    return '';
  }

  let result = new Decimal(n1).div(n2);

  const valueToReplace = `${oldN1}${separator}${oldN2}`;
  result = value.replace(valueToReplace, result);

  return result;
}

function minus(value) {
  value = value.replaceAll('--', '+');
  const {
    n1,
    n2,
    separator,
    oldN1,
    oldN2,
  } = normalizeArray(
    typeof value === 'string' ? value.split('') : value,
    '-'
  );

  let result = Decimal.sub(n1, n2);
  const valueToReplace = `${oldN1}${separator}${oldN2}`;
  result = value.replace(valueToReplace, result);

  return result;
}

function calcSinAndCos(value) {
  let newValue = reduceSymbols(value);
  if (value.includes('sin')) {
    const sinStartIndex = value.indexOf('sin(');
    const sinFinishIndex = value.slice(sinStartIndex).indexOf(')');
    const sinValue = value.slice(
      sinStartIndex + 4,
      sinFinishIndex + sinStartIndex
    );

    const valueToReplace = `sin(${sinValue})`;
    const calSinValue = String(Math.sin(sinValue)).slice(0, 17);
    newValue = value.replace(valueToReplace, calSinValue);
  } else if (value.includes('cos')) {
    const cosStartIndex = value.indexOf('cos(');
    const cosFinishIndex = value.slice(cosStartIndex).indexOf(')');
    const cosValue = value.slice(
      cosStartIndex + 4,
      cosFinishIndex + cosStartIndex
    );

    const valueToReplace = `cos(${cosValue})`;
    const calCosValue = String(Math.cos(cosValue)).slice(0, 17);
    newValue = value.replace(valueToReplace, calCosValue);
  }

  if (newValue.includes('sin') || value.includes('cos')) {
    return calcSinAndCos(newValue);
  } else {
    return reduceSymbols(newValue);
  }
}

function reduceBrackets(value) {
  const splittedValue = value;
  const indexOfStartBracket = splittedValue.indexOf('(');

  if (indexOfStartBracket > -1) {
    const indexOfEndBracket = splittedValue.indexOf(')');
    let valueFromBrackets = splittedValue.slice(
      indexOfStartBracket + 1,
      indexOfEndBracket
    );
    const valueToReplace = `(${valueFromBrackets})`;
    const nextOperator = getNextOperator(valueFromBrackets);

    if (nextOperator === '*') {
      valueFromBrackets = `(${multiply(valueFromBrackets)})`;
    } else if (nextOperator === '/') {
      valueFromBrackets = `(${divide(valueFromBrackets)})`;
    } else if (nextOperator === '+') {
      valueFromBrackets = `(${add(valueFromBrackets)})`;
    } else if (nextOperator === '-') {
      valueFromBrackets = `(${minus(valueFromBrackets)})`;
    }

    return value.replace(valueToReplace, valueFromBrackets);
  } else {
    return typeof value === 'string' ? value : value.join('');
  }
}

function getNextOperator(value) {
  const minImportantOperatorsIndex = Math.min(
    ...[value.slice(1).indexOf('*'), value.slice(1).indexOf('/')].filter(
      (v) => v > -1
    )
  );
  const minNonImportantOperatorsIndex = Math.min(
    ...[value.slice(1).indexOf('+'), value.slice(1).indexOf('-')].filter(
      (v) => v > -1
    )
  );

  const nextOperator =
    value[minImportantOperatorsIndex + 1] ||
    value[minNonImportantOperatorsIndex + 1];

  return nextOperator;
}

function reduceSymbols(value) {
  value = value.replaceAll(' ', '').trim();
  value = value.replaceAll('--', '+');
  value = value.replaceAll('++', '+');
  value = value.replaceAll('-+', '-');
  value = value.replaceAll('+-', '-');

  return value;
}

export function calculate(value) {
  if (isNumeric(value)) {
    return value;
  }

  let result = calcSinAndCos(value);

  result = reduceBrackets(result);
  if (result.includes('(')) {
    return calculate(result);
  }

  const nextOperator = getNextOperator(result);

  if (nextOperator === '+') {
    result = add(result);
    return calculate(result);
  } else if (nextOperator === '-') {
    result = minus(result);
    return calculate(result);
  } else if (nextOperator === '*') {
    result = multiply(result);
    return calculate(result);
  } else if (nextOperator === '/') {
    result = divide(result);
    return calculate(result);
  }

  return Number(result);
}
