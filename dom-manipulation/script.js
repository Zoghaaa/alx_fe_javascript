// Array to store quotes
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

// Populate the category dropdown with unique categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`; // Reset categories

  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Show a random quote from the selected category
function showRandomQuote(category = 'all') {
  let filteredQuotes = quotes;
  
  // Filter quotes if a category is selected
  if (category !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === category);
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Add a new quote and update categories
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save quotes to local storage after adding
    saveQuotes();

    // Update the categories dropdown
    populateCategories();

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    showRandomQuote();
  } else {
    alert("Please fill in both the quote and category.");
  }
}

// Filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;

  // Save the selected category to local storage
  localStorage.setItem('selectedCategory', selectedCategory);

  // Show a random quote from the filtered category
  showRandomQuote(selectedCategory);
}

// Load the last selected category from local storage
function loadSelectedCategory() {
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    document.getElementById('categoryFilter').value = savedCategory;
    showRandomQuote(savedCategory);
  } else {
    showRandomQuote(); // Default to all categories
  }
}

// Export quotes to JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);

    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories(); // Update dropdown categories with new quotes

    alert('Quotes imported successfully!');
  };

  fileReader.readAsText(event.target.files[0]);
}

// Event listener to show a new random quote
document.getElementById('newQuote').addEventListener('click', function() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  showRandomQuote(selectedCategory);
});

// Event listener to export quotes as JSON
document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);

// Load quotes and selected category on page load
window.onload = function() {
  loadQuotes(); // Load quotes from local storage
  populateCategories(); // Populate the category filter
  loadSelectedCategory(); // Restore the last selected category filter
};
