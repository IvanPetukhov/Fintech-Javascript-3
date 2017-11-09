/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */

function throttle(time, callback) {
  let isThrottled = false;

  function wrapper(...args) {
    if (isThrottled) {
      return;
    }

    callback.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, time);
  };

  return wrapper;
}

module.exports = { throttle };
