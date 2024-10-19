// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Load quotes from local storage
  function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes); // Overwrite the quotes array with stored data
    }
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Save quotes to local storage after adding
      saveQuotes();
  
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      showRandomQuote();
    } else {
      alert("Please fill in both the quote and category.");
    }
  }
  
  // Function to export quotes as JSON
  function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes to JSON format
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  
    // Clean up URL object
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
  
      // Add imported quotes to the existing quotes array
      quotes.push(...importedQuotes);
  
      // Save the updated quotes to local storage
      saveQuotes();
  
      alert('Quotes imported successfully!');
    };
  
    // Read the file as text
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener to show a new random quote
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Event listener to export quotes as JSON
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
  
  // Load existing quotes from local storage when the page loads
  window.onload = function() {
    loadQuotes(); // Load quotes from local storage if they exist
    showRandomQuote(); // Show a random quote on page load
  };
  