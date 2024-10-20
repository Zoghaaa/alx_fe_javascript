// script.js

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

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

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Show notifications
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Fetch quotes from the "server"
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();
    mergeQuotes(serverQuotes);
    showNotification("Quotes synced with server!");
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
    showNotification("Quote posted to server!");
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

// Sync quotes with the server (fetch and post)
async function syncQuotes() {
  await fetchQuotesFromServer(); // Fetch server quotes
  quotes.forEach(quote => {
    postQuoteToServer(quote); // Post each quote to the server
  });
}

// Start periodic data sync with server
function startDataSync() {
  setInterval(syncQuotes, 60000); // Sync every minute
}

// Initialize the app
window.onload = function() {
  loadQuotes(); // Load quotes from local storage
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  startDataSync(); // Start syncing with server
};
