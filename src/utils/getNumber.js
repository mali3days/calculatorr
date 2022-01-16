// если все цифры в числе уже <= n-1 - число найдено
// если нет
  // сортируем число, нужно число будет между полученным и начальным
  // 

export function getPreviousHugeNumber(number) {
    const numberArray = number.split('');
    const length = number.length;

    if (numberArray.slice().sort().every((n, index) => {
        return n === numberArray[index];
    })) {
        return Number(number);
    }

    const indexOfFirstSmallDigit = findIndexOfFirstSmallDigit(numberArray);
    const leadingNumber = numberArray.slice(0, indexOfFirstSmallDigit - 1).join('');
    const preLowerNumber = numberArray[indexOfFirstSmallDigit-1]-1;
    const nineNumbers = new Array(length-indexOfFirstSmallDigit).fill(9).join('');


    if (leadingNumber.split('').some((n) => n > preLowerNumber)) {
        return Number(`${leadingNumber[0] - 1}${new Array(length-1).fill(9).join('')}`);
    }

    return Number(`${leadingNumber}${preLowerNumber}${nineNumbers}`);
}

function findIndexOfFirstSmallDigit(array) {
    return array.findIndex((a, index) => {
        return array.slice(0, index).some((a2) => a2 > a)
    });
}
