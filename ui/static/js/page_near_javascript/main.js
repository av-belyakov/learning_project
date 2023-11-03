'use strict';

import {createButton} from './createrUserElement.js';

// просто тест пока что
(function() {
  const listTmp1 = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'];

  const createElementP = (myText = 'text is undefined') => {
    const newP = document.createElement('p');
    newP.append(myText);

    return newP;
  };

  const createElementUl = (list = ['none']) => {
    const newList = document.createElement('ol');

    list.forEach((element) => {
      const newElem = document.createElement('li');
      newElem.append(element);
      newList.insertAdjacentElement('beforeend', newElem);
    });

    return newList;
  };

  const pressButton = function() {
    const elementsP = document.getElementsByTagName('p');

    for (const elem of elementsP) {
      elem.innerHTML = 'вы нажали кнопку';
      elem.setAttribute('style', 'color: red');
    }
  };

  const divElem1 = document.getElementById('elem_1');

  divElem1.append(createElementP('Просто пояснение к данному списку'));
  divElem1.append(createElementUl(listTmp1));

  divElem1.append(createButton('нажать', pressButton));
})();
