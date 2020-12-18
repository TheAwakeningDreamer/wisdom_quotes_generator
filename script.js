const quoteUI = document.querySelector('#quote');
const authorUI = document.querySelector('#author');
const button = document.querySelector('.newQuote button');
const favBtn = document.querySelector('#fav-btn');
const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');
const hollowHeart = document.querySelector('#hollowHeart i');
const favQuotesTitle = document.querySelector('.fav-container h2');
const favQuotes = document.querySelector('.fav-quotes');

// Random quote on load
document.addEventListener('DOMContentLoaded', getNewQuote);
// Get favs
document.addEventListener('DOMContentLoaded', getFavs);

// Fixed menu scroll
window.onscroll = function () {
  sticky();
};
console.log(sidebar.offsetTop);

function sticky() {
  if (window.pageYOffset <= sidebar.offsetTop) {
    sidebar.style.position = 'absolute';
    sidebar.style.top = '10vh';
  } else {
    sidebar.style.position = 'fixed';
    sidebar.style.top = 0;
  }
  if (window.pageYOffset <= menu.offsetTop) {
    menu.style.position = 'fixed';
    menu.style.top = '105px';
  } else {
    menu.style.position = 'fixed';
    menu.style.top = '15px';
  }
}

// Show Menu when click
function showMenu(e) {
  sidebar.classList.toggle('show');
  e.preventDefault();
}

// Get Favs from LS
function getFavs() {
  let quotes;
  if (localStorage.getItem('quotes') === null) {
    quotes = [];
  } else {
    quotes = JSON.parse(localStorage.getItem('quotes'));
  }

  let authors;
  if (localStorage.getItem('authors') === null) {
    authors = [];
  } else {
    authors = JSON.parse(localStorage.getItem('authors'));
  }

  // Create Cards Anew
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

  // Generate Quote Fav Cards
  quotes.forEach(function (quote) {
    blockquote.textContent = `${quote}`;
  });
  authors.forEach(function (author) {
    cite.textContent = `${author}`;
  });
  favQuotes.appendChild(card);

  function removeQuoteFromLS(card) {
    let quotes;
    if (localStorage.getItem('quotes') === null) {
      quotes = [];
    } else {
      quotes = JSON.parse(localStorage.getItem('quotes'));
    }

    let authors;
    if (localStorage.getItem('authors') === null) {
      authors = [];
    } else {
      authors = JSON.parse(localStorage.getItem('authors'));
    }

    quotes.forEach(function (quote) {
      blockquote.textContent = `${quote}`;
    });
    authors.forEach(function (author) {
      cite.textContent = `${author}`;
    });
  }

  // Delete quote from favs
  function deleteQuote() {
    deleteBtn.parentElement.remove();

    if (!favQuotes.hasChildNodes()) {
      favBtn.textContent = 'Show Favs';
      favQuotesTitle.classList.toggle('show');
      favQuotes.classList.toggle('show');
    }
    // Remove from LS
    removeQuoteFromLS(deleteBtn.parentElement);
  }
  deleteBtn.addEventListener('click', deleteQuote);
}

// Add to favorite
function addToFavorites(e) {
  e.preventDefault();

  // Change icon
  hollowHeart.classList.toggle('far');
  hollowHeart.classList.toggle('fas');

  if (hollowHeart.classList.contains('fas')) {
    // Define Variables
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

    // Generate Quote Fav Cards
    quotes.forEach(function (quote) {
      blockquote.textContent = `${newFavQuote}`;
    });
    authors.forEach(function (author) {
      cite.textContent = `${newFavAuthor}`;
    });
    favQuotes.appendChild(card);

    // Delete quote from favs
    function deleteQuote() {
      deleteBtn.parentElement.remove();
      showFav();
    }

    deleteBtn.addEventListener('click', deleteQuote);
  }
}

function showFav() {
  if (favQuotes.hasChildNodes()) {
    // where it bugs
    favQuotesTitle.className = 'fav-quotes show';
    favQuotes.className = 'fav-quotes show';
    favBtn.textContent = 'Hide Favs';
  } else {
    favBtn.textContent = 'Show Favs';
    favQuotes.className = 'fav-quotes';
    favQuotesTitle.classList.remove('show');
    favQuotes.classList.remove('show');
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

// Event Listeners
button.addEventListener('click', getNewQuote);
menu.addEventListener('click', showMenu);
hollowHeart.addEventListener('click', addToFavorites);
favBtn.addEventListener('click', showFav);
