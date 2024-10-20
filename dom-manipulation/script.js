const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API for simulation

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspirational", synced: true },
  { text: "Life is what happens when you're busy making other plans.", category: "Life", synced: true },
];

// Display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory, synced: false };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate the category dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  
  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Export quotes to JSON
document.getElementById('exportQuotes').addEventListener('click', function() {
  const dataStr = JSON.stringify(quotes);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Sync quotes with the "server"
async function syncQuotes() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();
    
    mergeQuotes(serverQuotes);

    const unsyncedQuotes = getUnsyncedQuotes();
    for (const quote of unsyncedQuotes) {
      await postQuoteToServer(quote);
    }
    console.log('Quotes synced successfully');
  } catch (error) {
    console.error('Error syncing quotes:', error);
  }
}

// Merge server quotes with local quotes
function mergeQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  
  serverQuotes.forEach(serverQuote => {
    if (!localQuotes.some(localQuote => localQuote.text === serverQuote.text)) {
      localQuotes.push(serverQuote);
    }
  });

  localStorage.setItem('quotes', JSON.stringify(localQuotes));
  displayRandomQuote();
}

// Post new quotes to the "server"
async function postQuoteToServer(quote) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(quote),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    quote.synced = true;
    saveQuotes();
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

// Get unsynced quotes
function getUnsyncedQuotes() {
  return quotes.filter(quote => !quote.synced);
}

// Start syncing quotes periodically
function startSyncingQuotes() {
  setInterval(syncQuotes, 5000);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// On page load
window.onload = function() {
  populateCategories();
  displayRandomQuote();
  startSyncingQuotes();
};
