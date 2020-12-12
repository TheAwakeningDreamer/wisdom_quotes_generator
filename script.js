const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote Button');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');
const x = matchMedia('(max-width:760px');

function mediaQueries() {
  if (x.matches) {
    menu.document.getElementByTagName('i').className = 'fas fa-share fa-2x';
  }
}

function showMenu() {
  sidebar.classList.toggle('show');
}

function fillHeart() {
  hollowHeart.classList.toggle('far');
  hollowHeart.classList.toggle('fas');
}

function getNewQuote() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'quotes.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const quotes = JSON.parse(this.responseText);
      console.log(this.responseText);

      let id;
      id = Math.floor(Math.random() * quotes.length + 1);

      console.log(quotes);
      console.log(quotes.length);

      quoteUI.textContent = `" ${quotes[id].quote} "`;
      authorUI.textContent = `${quotes[id].author}`;
    }
  };

  xhr.send();
}

// let storedQuote;

// localStorage.setItem('quote', 'I am groot');
// localStorage.setItem('author', 'Groot');
// storedQuote = localStorage.getItem('quote');
// storedAuthor = localStorage.getItem('author');

// console.log(storedQuote);
// console.log(storedAuthor);

// localStorage.clear();

// Event Listeners
button.addEventListener('click', getNewQuote);
menu.addEventListener('click', showMenu);
hollowHeart.addEventListener('click', fillHeart);
