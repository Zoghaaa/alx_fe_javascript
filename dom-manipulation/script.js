let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "The best way to predict the future is to create it.", category: "Inspiration" }
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// Fetch quotes from the "server"
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();
    mergeQuotes(serverQuotes);
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Post new quotes to the "server"
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(quote),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const serverResponse = await response.json();
    console.log('Quote posted to server:', serverResponse);
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

// Merge server quotes with local quotes
function mergeQuotes(serverQuotes) {
  let hasConflict = false;

  serverQuotes.forEach(serverQuote => {
    const existingQuote = quotes.find(localQuote => localQuote.text === serverQuote.text);

    if (!existingQuote) {
      quotes.push(serverQuote);
    } else if (existingQuote.category !== serverQuote.category) {
      hasConflict = true;
      resolveConflict(existingQuote, serverQuote);
    }
  });

  if (hasConflict) {
    alert('Some conflicts were resolved with the server data.');
  }

  saveQuotes();
}

// Conflict resolution: Server quote takes precedence, user can decide
function resolveConflict(localQuote, serverQuote) {
  const userDecision = confirm(`Conflict detected! 
    Local quote: "${localQuote.text}" (${localQuote.category}) 
    Server quote: "${serverQuote.text}" (${serverQuote.category})
    
    Would you like to keep the server's version?`);

  if (userDecision) {
    localQuote.category = serverQuote.category;
  }
}

// Add new quote and sync with server
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    postQuoteToServer(newQuote); // Sync new quote with server
  }
}

// Start periodic data sync with server
function startDataSync() {
  setInterval(fetchQuotesFromServer, 60000);
}

window.onload = function() {
  loadQuotes(); // Load quotes from local storage
  startDataSync(); // Start syncing with server
};
