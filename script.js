const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote button');
const favBtn = document.querySelector('#fav-btn');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');
const favQuotesTitle = document.querySelector('.fav-container h2');
const favQuotes = document.querySelector('.fav-quotes');

// const x = matchMedia('(max-width:760px');

// function mediaQueries() {
//   if (x.matches) {
//     menu.document.getElementByTagName('i').className = 'fas fa-share fa-2x';
//   }
// }

window.onload = function () {
  getNewQuote();
};

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

  // Create cards in favQuotes section

  // Create individual Card
  let card = document.createElement('div');
  card.className = 'quote-box';
  card.id = 'quote-box';
  console.log(card);

  // Create blockquote & append
  let blockquote = document.createElement('blockquote');
  blockquote.id = 'quote';
  card.appendChild(blockquote);

  // Create cite & append
  let cite = document.createElement('cite');
  cite.id = 'author';
  card.appendChild(cite);

  // Append Card to favquotes

  let cards = favQuotes.card;

  function createNewCard() {
    quotes.forEach(function (quote) {
      blockquote.innerHTML += `
                ${quote}
            `;
    });
    authors.forEach(function (author) {
      cite.innerHTML += `
        ${author}
              `;
    });
    favQuotes.appendChild(card);
  }

  createNewCard();

  console.log(card);
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

      quoteUI.textContent = `“ ${quotes[id].quote} ”`;
      authorUI.textContent = `${quotes[id].author}`;
    }
  };

  xhr.send();
}

// Event Listeners
button.addEventListener('click', getNewQuote);
menu.addEventListener('click', showMenu);
hollowHeart.addEventListener('click', addToFavorites);
favBtn.addEventListener('click', showFav);
