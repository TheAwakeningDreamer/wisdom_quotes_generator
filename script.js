const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote button');
const favBtn = document.querySelector('#fav-btn');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');
const favQuotesTitle = document.querySelector('.fav-container h2');
const favQuotes = document.querySelector('.fav-quotes');

// Show Menu when click
function showMenu(e) {
  sidebar.classList.toggle('show');
  e.preventDefault();
}

// Add to favorite
function addToFavorites(e) {
  // Change icon
  hollowHeart.classList.toggle('far');
  hollowHeart.classList.toggle('fas');

  if (hollowHeart.classList.contains('fas')) {
    const newFavQuote =
      button.parentElement.previousElementSibling.lastElementChild.children[0]
        .textContent;
    const newFavAuthor =
      button.parentElement.previousElementSibling.lastElementChild.children[1]
        .textContent;
    // Store in Local Storage
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
    console.log(quotes);
    console.log(authors);

    // Create Cards
    // Create individual card
    let card = document.createElement('div');
    card.className = 'quote-box';
    card.id = 'quote-box';

    // Create blockquote & cite + append to div
    let blockquote = document.createElement('blockquote');
    blockquote.id = 'quote';
    let cite = document.createElement('cite');
    cite.id = 'author';
    card.appendChild(blockquote);
    card.appendChild(cite);

    // Create Delete Btn
    let deleteBtn = document.createElement('a');
    deleteBtn.id = 'delete-btn';
    let dltIcon = document.createElement('i');
    dltIcon.className = 'fas fa-times fa-2x';
    deleteBtn.appendChild(dltIcon);
    card.appendChild(deleteBtn);

    // Quote
    quotes.forEach(function (quote) {
      blockquote.textContent = `${quote}`;
    });

    authors.forEach(function (author) {
      cite.textContent = `${author}`;
    });

    console.log(card);

    favQuotes.appendChild(card);

    function deleteQuote() {
      deleteBtn.parentElement.remove();
    }
    deleteBtn.addEventListener('click', deleteQuote);
  }

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

function deleteQuote(e) {
  console.log('123');
  e.preventDefault();
}

// Event Listeners
button.addEventListener('click', getNewQuote);
menu.addEventListener('click', showMenu);
hollowHeart.addEventListener('click', addToFavorites);
favBtn.addEventListener('click', showFav);
document.addEventListener('DOMContentLoaded', getNewQuote);
