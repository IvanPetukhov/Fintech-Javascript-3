/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  /* //The first variant:
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      logger(i);
    }, 100);
  }
  */
  /* // The second variant:
  let i = 0;

  logger(i++);
  const timePrint = setInterval(() => {
    logger(i++);
  }, 100);

  setTimeout(() => {
    clearInterval(timePrint);
  }, 1000);
  */
  // The third variant:
  for (let i = 0; i < 10; i++) {
    (arg => setTimeout(() => {
      logger(arg);
    }, 100))(i);
  }
}

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  return function(...bindArgs) {
    func.call(context, ...args, ...bindArgs);
  };
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  if (x === undefined) {
    return 0;
  }
  return function(y) {
    if (y === undefined) {
      return x;
    }
    return sum(x + y);
  };
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  const firstWordArr = first.trim().split('');
  const secondWordArr = second.trim().split('');
  const firstWordObj = {};

  for (let i = 0; i < firstWordArr.length; i++) {
    if (firstWordObj[firstWordArr[i]] !== undefined) {
      firstWordObj[firstWordArr[i]] += 1;
    } else {
      firstWordObj[firstWordArr[i]] = 1;
    }
  }
  for (let i = 0; i < secondWordArr.length; i++) {
    if (firstWordObj[secondWordArr[i]] >= 1) {
      firstWordObj[secondWordArr[i]] -= 1;
      if (firstWordObj[secondWordArr[i]] === 0) {
        delete firstWordObj[secondWordArr[i]];
      }
    }
  }
  return Object.keys(firstWordObj).length === 0;
}

/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  const objectArr = {};

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    objectArr[element] = true;
  }
  return (Object.keys(objectArr)).map(Number).sort((a, b) => { return a < b ? -1 : 1; });
}
/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  const resArray = [];
  const objArr = {};

  for (let i = 0; i < second.length; i++) {
    if (objArr[second[i]] !== undefined) {
      objArr[second[i]] += 1;
    } else {
      objArr[second[i]] = 1;
    }
  }
  for (let i = 0; i < first.length; i++) {
    if (objArr[first[i]] > 1) {
      resArray.push(first[i]);
      objArr[first[i]] -= 1;
    } else if (objArr[first[i]] === 1) {
      resArray.push(first[i]);
      objArr[first[i]] -= 1;
    }
  }
  return resArray.sort((a, b) => { return a < b ? -1 : 1; });
}
/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  let count = 0;

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      count++;
    }
  }
  return count <= 1;
}

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
