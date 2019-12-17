'use strict';

function Goods(title, src) {
  this.title = title;
  this.src = src;
  this.clickregister = 0;
  this.shownregister = 0;
  Goods.all.push(this);

}
Goods.all = [];
Goods.roundregister = 0;
Goods.roundpollLimit = 25;

Goods.container = $(`#container`).get(0);

Goods.fisrtImg = $('#fisrt-img').get(0);
Goods.secondImg = $('#second-img').get(0);
Goods.thirdImg = $('#third-img').get(0);

Goods.fisrtTitle = $('#fisrt-title').get(0);
Goods.secondTitle = $('#second-title').get(0);
Goods.thirdTitle = $('#third-title').get(0);

Goods.img1Object = null;
Goods.img2Object = null;
Goods.img3Object = null;

new Goods('Bag', 'image/bag.jpg');
new Goods('Banana', 'image/banana.jpg');
new Goods('Bathroom', 'image/bathroom.jpg');
new Goods('Boots', 'image/boots.jpg');
new Goods('breakfast', 'image/breakfast.jpg');
new Goods('bubblegum', 'image/bubblegum.jpg');
new Goods('chair', 'image/chair.jpg');
new Goods('cthulhu', 'image/cthulhu.jpg');
new Goods('dog-duck', 'image/dog-duck.jpg');
new Goods('dragon', 'image/dragon.jpg');
new Goods('pen', 'image/pen.jpg');
new Goods('pet-sweep', 'image/pet-sweep.jpg');
new Goods('scissors', 'image/scissors.jpg');
new Goods('shark', 'image/shark.jpg');
new Goods('sweep', 'image/sweep.png');
new Goods('tauntaun', 'image/tauntaun.jpg');
new Goods('unicorn', 'image/unicorn.jpg');
new Goods('usb', 'image/usb.gif');
new Goods('water-can', 'image/water-can.jpg');
new Goods('wine-glass', 'image/wine-glass.jpg');


function renderNewGoods() {


  var forbidden = [Goods.img1Object, Goods.img2Object, Goods.img3Object];

  do {

    Goods.img1Object = getRandomGoods();

  } while (forbidden.includes(Goods.img1Object));


  forbidden.push(Goods.img1Object); 
  do {

    Goods.img2Object = getRandomGoods();

  } while (forbidden.includes(Goods.img2Object));
  forbidden.push(Goods.img2Object);

  do {

    Goods.img3Object = getRandomGoods();

  } while (forbidden.includes(Goods.img3Object))

  Goods.img1Object.shownregister++;
  Goods.img2Object.shownregister++;
  Goods.img3Object.shownregister++;


  $('#fisrt-img').attr('src', Goods.img1Object.src);
  $('#fisrt-img').attr('alt', Goods.img1Object.title);

  $('#second-img').attr('src', Goods.img2Object.src);      
  $('#second-img').attr('alt', Goods.img2Object.title);

  $('#third-img').attr('src', Goods.img3Object.src);
  $('#third-img').attr('alt', Goods.img3Object.title);

   // Goods.fisrtTitle.textContent = Goods.img1Object.title;
   $('#fisrt-title').html(Goods.img1Object.title); 
   // Goods.secondTitle.textContent = Goods.img2Object.title;
   $('#second-title').html(Goods.img2Object.title); 
   // Goods.thirdTitle.textContent = Goods.img3Object.title;
   $('#third-title').html(Goods.img3Object.title); 
}



function getRandomGoods() {
  var index = Math.floor(Math.random() * Goods.all.length);
  return Goods.all[index];

}


function resultList() {
 
  $('#create-ul').html('');
  $('#create-ul').append('<ul class="nn"></ul>')  
  for (var i = 0; i < Goods.all.length; i++) {
      var mer = Goods.all[i];
      $('.nn').append(`<li>*${mer.title}had${mer.clickregister}votes and was shown${mer.shownregister} times</li>`);
  }
}

// function addElement(tag, container, text) {
//   element = $('container').append('tag')


//   if (text) {
   
//     element.text() = text;
//   }
//   return element;
// }


// function clickHandler() {

//   var goodsClicked;

//   $('#fisrt-img').click(function () {

//     goodsClicked = Goods.img1Object;
//   });


//   $('#second-img').click(function () {

//     goodsClicked = Goods.img2Object;

//   });


//   $('#third-img').click(function () {

//     goodsClicked = Goods.img3Object;

//   });
//   if (goodsClicked) {
//     goodsClicked.clickregister++;
//     Goods.roundregister++;

//     resultList();
//     if (Goods.roundregister === Goods.roundpollLimit) {

//       alert('No more clicking for you!');

//       Goods.container.off('click', clickHandler);

//     } else {

//       renderNewGoods();
//     }

//   }
// }

$('#container').click(function (event) {
    event.preventDefault();
    let clicked = event.target.id;
    let goodsClicked;
    // set
    if (clicked === 'fisrt-img') {
       goodsClicked = Goods.img2Object;
    } else if (clicked === 'second-img') {
        goodsClicked =  Goods.img2Object;
    } else if (clicked === 'third-img') {
        goodsClicked = Goods.img3Object;
    } else {
        alert('Um, what was clicked on???');
    }
    if (goodsClicked) {
      goodsClicked.clickregister++;
       Goods.roundregister++;
       if (Goods.roundregister === Goods.roundpollLimit) {
        resultList();
            alert('No more clicking for you!')
            $('#container').off('click')
             //local storage 
      var productString = JSON.stringify(Goods.all);
      localStorage.setItem('products', productString);
            finalChart();
        } else {
           renderNewGoods();
        }
    }
});
function finalChart() {
  var goodsArray = [];
  var clickArray = [];
  var showArray = [];
  for (var i = 0; i < Goods.all.length; i++) {
    var goods = Goods.all[i];
    goodsArray.push(goods.title + 'Vote');
    goodsArray.push(goods.title + 'Shown');
    clickArray.push(goods.clickregister);
    showArray.push(goods.shownregister);

  }
  var ctx = document.getElementById('new Chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Bag ', 'Banana ', 'Bathroom ', 'Boots ', 'Breakfast ', 'Bubblegum ', 'Chair ', 'Cthulhu ', 'Dog-Duck ', 'Dragon ', 'Pen ', 'Pet-Sweep ', 'Scissors ', 'Shark ', 'Sweep ', 'Tauntaun ', 'Unicorn ', 'USB ', 'Water-Can ', 'Wine-Glass '],
      datasets: [
        {
          label: 'indecates the voted ones',
          backgroundColor: ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',],
          borderColor: ['green'],
          data: clickArray,
        },
        {
          label: 'indicates the shown ones',
          backgroundColor: ['brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown', 'brown',],
          borderColor: ['green'],
          data: showArray,
        }
      ]
    },
    options: {}
  });
}
function getStoredProducts() {

  // retreive the stored into about list of product
  var productString = localStorage.getItem('products');

  if (productString) {

    var rawObjectArray = JSON.parse(productString);

    for (var i = 0; i < rawObjectArray.length; i++) {
      var rawObject = rawObjectArray[i];
      var currentInstance = Goods.all[i];
      currentInstance.clickregister = rawObject.clickregister;
      currentInstance.shownregister = rawObject.shownregister;

    }
  }
}

getStoredProducts();


// resultList();
renderNewGoods();
// finalChart(); 




