'use strict';

import myImg1 from '../../img/maxresdefault.jpg';

(function() {
  const img1 = document.getElementById('img_1');

  const myNewImg1 = document.createElement('img');
  myNewImg1.setAttribute('src', '../../img/maxresdefault.jpg');
  img1.insertAdjacentElement(myNewImg1);
})();
