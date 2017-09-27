/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
*/
function getMinMax(string) {
  const regex = /\-?\d+(\.\d)?\d*/g;
  const numbers = string.match(regex);

  if (numbers.length === 0) {
    return {};
  }
  let minim = parseFloat(numbers[0]);
  let maxim = parseFloat(numbers[0]);

  for (let i = 0; i < numbers.length; i++) {
    const num = parseFloat(numbers[i]);

    minim = minim > num ? num : minim;
    maxim = maxim < num ? num : maxim;
  }
  return { max: maxim, min: minim };
}
/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа 
 * @return {number} число под номером х 
 */
function fibonacciSimple(x) {
  if (x === 1 || x === 0 || x === 2) {
    return x > 0 ? 1 : 0;
  }
  return fibonacciSimple(x - 2) + fibonacciSimple(x - 1);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
let fibonacciWithCache;

function fibonacciWithCacheFunc(x) {
  let cache = {};
  let res;

  return x => {
    if (x in cache) {
      return cache[x];
    }
    if (x === 1 || x === 0 || x === 2) {
      res = x > 0 ? 1 : 0;
    } else {
      res = fibonacciWithCache(x - 2) + fibonacciWithCache(x - 1);
    }
    cache[x] = res;
    return res;
  }

}

fibonacciWithCache = fibonacciWithCacheFunc();

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
  let a = [];

  for (let i = 0; i < strNum; i++) {
    a[i] = [];
  }
  a[0][0] = 0;
  for (let i = 1; i < cols && i <= max; i++) {
    a[0][i] = ((a[0][i - 1] + strNum) <= max) ? (a[0][i - 1] + strNum) : (a[0][i - 1] + 1);
  }
  for (let i = 0; i < cols; i++) {
    if (i !== cols - 1) {
      for (let j = a[0][i] + 1; j < a[0][i + 1]; j++) {
        a[j - a[0][i]][i] = a[j - a[0][i] - 1][i] + 1;
      }
    } else {
      for (let j = a[0][i] + 1; j <= max; j++) {
        a[j - a[0][i]][i] = a[j - a[0][i] - 1][i] + 1;
      }
    }
  }
  return a;
}

function printNumbers(max, cols) {
  const strNum = Math.ceil((max + 1) / cols);
  let res = ' ';
  const a = fillInArray(max, strNum, cols);

  for (let i = 0; i < strNum; i++) {
    for (let j = 0; j < a[i].length; j++) {
      res += a[i][j];
      if (j === a[i].length - 1) {
        if (i === strNum - 1) {
          return res;
        }
        if (Math.trunc(a[i + 1][0] / 10) === 0) {
          res += '\n ';
        } else {
          res += '\n';
        }
      } else if (Math.trunc(a[i][j + 1] / 10) === 0) {
        res += '  ';
      } else {
        res += ' ';
      }
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
