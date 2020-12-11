const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote Button');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');

function showMenu() {
  sidebar.classList.toggle('show');
}

function fillHeart() {
  hollowHeart.classList.toggle('far');
  hollowHeart.classList.toggle('fas');
}

function getNewQuote() {
  // let id;
  // id = Math.floor(Math.random() * 31 + 1);
  // console.log(id);

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'quotes.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      console.log(this.responseText);

      const quotes = JSON.parse(this.responseText);

      console.log(quotes);

      quoteUI.textContent = `"${quotes[0].quote}"`;
      authorUI.textContent = `${quotes[0].author}`;
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
