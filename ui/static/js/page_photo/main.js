'use strict';

// import imgTmp1 from '../../img/maxresdefault.jpg';
import imgTmp1 from '../../../static/img/maxresdefault.jpg';

(function() {
  const img1 = document.getElementById('img_1');

  const myNewImg1 = document.createElement('img');
  // myNewImg1.setAttribute('src', 'dist/_/img/maxresdefault.jpg');
  myNewImg1.setAttribute('src', imgTmp1);

  console.log(myNewImg1);
  console.log(imgTmp1);

  img1.insertAdjacentElement('afterend', myNewImg1);
})();
