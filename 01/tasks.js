/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  let a = [];
  let i = 0;
  let str = string;
  while (true){
    const end1 = str.indexOf(' ');
    const end2 = str.indexOf(',');
    if((end1 === -1 || end1 === str.length - 1) && (end2 === -1 || end2 === str.length - 1)){
      const k = parseFloat(str);
      if(!isNaN(k)){
        a[i] = k;
      }
      break;
    } else if ((end1 === -1 || end1 === str.length - 1) && (end2 !== -1 && end2 !== str.length - 1)){
      const x = parseFloat(str.slice(0, end2));
      if(isNaN(x)){
        str = str.slice(end2 + 1);
      } else{
        a[i] = x;
        str = str.slice(end2 + 1);
        i++;
      }
    } else if ((end2 === -1 || end2 === str.length - 1) && (end1 !== -1 && end1 !== str.length - 1)){
      const y = parseFloat(str.slice(0, end1));
      if(isNaN(y)){
        str = str.slice(end1 + 1);
      } else{
        a[i] = y;
        str = str.slice(end1 + 1);
        i++;
      }
    } else{
      const pos = end1 < end2 ? end1 : end2
      const z = parseFloat(str.slice(0, pos));
      if(isNaN(z)){
        str = str.slice(pos + 1);
      } else{
        a[i] = z;
        str = str.slice(pos + 1);
        i++;
      }
    }
    if (str === null)
      break;
  }
  if (a.length !== 0){
    let max = a[0];
    let min = a[0];
    for (let i = 0; i < a.length; i++){
      if(a[i] > max){
        max = a[i];
      }
      if(a[i] < min){
        min = a[i];
      }
    }
    let res = {"max" : max, "min" : min};
    return res;
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
  if (x === 1){
      return 1;
  }
  if (x === 2){
      return 1;
  }
  let res = fibonacciSimple(x-2) + fibonacciSimple(x-1);
  return res;
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
let cache = {};

function fibonacciWithCache(x) {
    if (x in cache){
        return cache[x];
    }
    if (x === 1){
        cache[1] = 1;
        return 1;
    }
    if (x === 2){
        cache[2] =  1;
        return 1;
    }
    let res = fibonacciWithCache(x-2) + fibonacciWithCache(x-1);
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
function printNumbers(max, cols) {
  let strNum = Math.ceil(max / cols);
  let res = " ";
  let a = [];
  for(let i = 0; i <= max; i++){
      a[Math.trunc(i / strNum) + (i % strNum) * cols] = i;
  }
  for(let i = 0; i < a.length; i++){
      res += a[i];
      if (i == a.length - 1){
          break;
      }
      if((i + 1) % cols === 0){
          if (Math.trunc(a[i + 1] / 10) === 0){
              res += "\n ";
          } else{
              res += "\n";
          }
      } else{
          if(Math.trunc(a[i + 1] / 10) === 0){
              res += "  ";
          } else{
              res += " ";
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
  let str = "";
  while(i < input.length){
      let count = 1;
      while(input[i] === input[i + count]){
          count++;
      }
      if(count !== 1){
          str += input[i] + count;
          i += count;
      } else{
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
