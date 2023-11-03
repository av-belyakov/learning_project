'use strict';

/**
 * createButton предназначенна для создания кнопки
 *
 * @param {string} buttonName наименование кнопки
 * @param {function} f функция обработчик при нажатии на кнопку
 *
 * @return {object}
 */
export function createButton(buttonName, f) {
  const button = document.createElement('button');

  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn btn-secondary');
  button.append(buttonName);
  button.onclick = f;

  return button;
}
