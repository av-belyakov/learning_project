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

  const divElem1 = document.getElementById('elem_1');

  divElem1.append(createElementP('Просто пояснение к данному списку'));
  divElem1.append(createElementUl(listTmp1));
})();
