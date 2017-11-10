const input = document.getElementById('phone__input');
const link = document.getElementById('phone__link');

function updateLink(elem) {
  if (input.value.length === elem.defaultValue.length && input.value.indexOf('_') === -1) {
    link.href = `tel:+${input.value.replace(/\D+/g, '').slice(0, 11)}`;
    link.textContent = `Позвонить на ${input.value}`;
  }
}

function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    const range = elem.createTextRange();

    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function mask(event) {
  let maskedInput = this.defaultValue;

  let i = 0;
  const defaultVal = maskedInput.replace(/\D/g, '');

  let val = this.value.replace(/\D/g, '').slice(0, 11);

  if (defaultVal.length >= val.length) {
    val = defaultVal;
  }
  maskedInput = maskedInput.replace(/[_\d]/g, a => {
    i += 1;
    return val.charAt(i - 1) || '_';
  });
  this.value = maskedInput;
  i = maskedInput.lastIndexOf(val.substr(-1));
  if (i < maskedInput.length && maskedInput !== this.defaultValue) {
    i += 1;
  } else {
    i = maskedInput.indexOf('_');
  }
  setCursorPosition(i, this);
  updateLink(this);
}

input.addEventListener('input', mask, false);
