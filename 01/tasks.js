/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
*/
let maxim;
let minim;

function checkFirstMaxMin(number, isFirstTime) {
  if (isFirstTime) {
    maxim = number;
    minim = number;
    isFirstTime = false;
  } else {
    if (maxim < number) {
      maxim = number;
    }
    if (minim > number) {
      minim = number;
    }
  }
}

function fillInMinMax(str, number, isFirstTime) {
  while (true) {
    const end = str.indexOf(' ');

    if (end === -1 || end === str.length - 1) {
      number = parseFloat(str);
      if (!isNaN(number)) {
        checkFirstMaxMin(number, isFirstTime);
      }
      break;
    }
    if (end !== -1 && end !== str.length - 1) {
      number = parseFloat(str.slice(0, end));
      if (isNaN(number)) {
        str = str.slice(end + 1);
      } else {
        checkFirstMaxMin(number, isFirstTime);
        str = str.slice(end + 1);
      }
    }
    if (str === null) {
      break;
    }
  }
}

function getMinMax(string) {
  let isFirstTime = true;
  let str = string.replace(/[^-\.\d-]/g, ' ');
  let number;
  
  fillInMinMax(str, number, isFirstTime);
  if (maxim !== undefined && minim !== undefined) {
    return { max: maxim, min: minim };
  }
  return {};
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа 
 * @return {number} число под номером х 
 */
function fibonacciSimple(x) {
  if (x === 1) {
    return 1;
  }
  if (x === 2) {
    return 1;
  }
  const res = fibonacciSimple(x - 2) + fibonacciSimple(x - 1);

  return res;
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
const cache = {};

function fibonacciWithCache(x) {
  if (x in cache) {
    return cache[x];
  }
  if (x === 1) {
    cache[1] = 1;
    return 1;
  }
  if (x === 2) {
    cache[2] = 1;
    return 1;
  }
  const res = fibonacciWithCache(x - 2) + fibonacciWithCache(x - 1);

  cache[x] = res;
  return res;
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */

function fillInArray(max, strNum, cols) {
  const a = [];

  for (let i = 0; i <= max; i++) {
    a[Math.trunc(i / strNum) + (i % strNum) * cols] = i;
  }
  return a;
}

function printNumbers(max, cols) {
  const strNum = Math.ceil(max / cols);
  let res = ' ';
  const a = fillInArray(max, strNum, cols);
  
  for (let i = 0; i < a.length; i++) {
    res += a[i];
    if (i === a.length - 1) {
      break;
    }
    if ((i + 1) % cols === 0) {
      if (Math.trunc(a[i + 1] / 10) === 0) {
        res += '\n ';
      } else {
        res += '\n';
      }
    } else if (Math.trunc(a[i + 1] / 10) === 0) {
      res += '  ';
    } else {
      res += ' ';
    }
  }
  return res;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  let i = 0;
  let str = '';

  while (i < input.length) {
    let count = 1;

    while (input[i] === input[i + count]) {
      count++;
    }
    if (count !== 1) {
      str += input[i] + count;
      i += count;
    } else {
      str += input[i];
      i++;
    }
  }
  return str;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
