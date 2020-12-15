const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote button');
const favBtn = document.querySelector('#fav-btn');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');

const favQuotesTitle = document.querySelector('.fav-container h2');
const favQuotes = document.querySelector('.fav-quotes');

const x = matchMedia('(max-width:760px');

// function mediaQueries() {
//   if (x.matches) {
//     menu.document.getElementByTagName('i').className = 'fas fa-share fa-2x';
//   }
// }

function showMenu() {
  sidebar.classList.toggle('show');
}

function addToFavorites(e) {
  hollowHeart.classList.toggle('far');
  hollowHeart.classList.toggle('fas');
  const newFavQuote =
    button.parentElement.previousElementSibling.lastElementChild.children[0]
      .textContent;
  const newFavAuthor =
    button.parentElement.previousElementSibling.lastElementChild.children[1]
      .textContent;

  let quotes;
  if (localStorage.getItem('quotes') === null) {
    quotes = [];
  } else {
    quotes = JSON.parse(localStorage.getItem('quotes'));
  }
  quotes.push(newFavQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));

  let authors;
  if (localStorage.getItem('authors') === null) {
    authors = [];
  } else {
    authors = JSON.parse(localStorage.getItem('authors'));
  }
  authors.push(newFavAuthor);
  localStorage.setItem('authors', JSON.stringify(authors));

  e.preventDefault();
}

function showFav() {
  favQuotesTitle.classList.toggle('show');
  favQuotes.classList.toggle('show');

  if (favQuotesTitle.classList.contains('show')) {
    favBtn.textContent = 'Hide Favs';
  } else {
    favBtn.textContent = 'Show Favs';
  }

  const quotes = JSON.parse(localStorage.getItem('quotes'));
  const authors = JSON.parse(localStorage.getItem('authors'));

  quotes.forEach(function (quote) {
    favQuotes.innerHTML += `
      <div class="quote-box" id="quote-box">
            <blockquote id="quote">
              ${quote}
            </blockquote>
            <cite id="author">${author}</cite>
          </div>
          `;
  });
  authors.forEach(function (author) {
    favQuotes.innerHTML += `
      <div class="quote-box" id="quote-box">
            <blockquote id="quote">
              ${quote}
            </blockquote>
            <cite id="author">${author}</cite>
          </div>
          `;
  });
}

function getNewQuote() {
  hollowHeart.classList.remove('fas');
  hollowHeart.classList.add('far');

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'quotes.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const quotes = JSON.parse(this.responseText);

      let id;
      id = Math.floor(Math.random() * quotes.length + 1);

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
hollowHeart.addEventListener('click', addToFavorites);
favBtn.addEventListener('click', showFav);
