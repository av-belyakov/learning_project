'use strict'

// import imgTmp1 from '../../img/maxresdefault.jpg';
import imgTmp1 from '../../../static/img/maxresdefault.jpg';

(function () {
  const devImg1 = document.getElementById('img_1')

  const myNewImg1 = document.createElement('img')
  myNewImg1.setAttribute('src', imgTmp1)

  //  img1.insertAdjacentElement('afterend', myNewImg1);
  devImg1.append(myNewImg1)
})()
