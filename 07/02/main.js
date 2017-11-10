const tDistance = 1000;
const button = document.getElementById('check__button');
const list = document.getElementById('check__ol');

function dClickHandler() {
  const elem = document.createElement('li');
  const timeStamp = new Date().getTime();

  elem.textContent = `double click at ${timeStamp}`;
  list.appendChild(elem);
}

function doubleClick(element, doubleClickHandler, timeDistance) {
  let timer = 0;
  let isClicked = false;

  element.addEventListener('click', () => {
    if (isClicked) {
      isClicked = false;
      clearTimeout(timer);
      doubleClickHandler();
    } else {
      isClicked = true;
      timer = setTimeout(() => {
        isClicked = false;
      }, timeDistance);
    }
  });
}

doubleClick(button, dClickHandler, tDistance);
