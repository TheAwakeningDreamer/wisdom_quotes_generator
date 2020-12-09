const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const button = document.querySelector('.newQuote Button');

getNewQuote(){
  let id;
  id = Math.floor(Math.random()*31 + 1 );
  console.log(id);
}

getNewQuote();

// Event Listeners
button.addEventListener('click', getNewQuote)