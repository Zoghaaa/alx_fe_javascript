let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Regret" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Time" }
  ];

  function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Update the DOM by setting the text content of the 'quoteDisplay' div
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
  

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
function addQuote() {
    // Get the new quote text and category from the input fields
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear the input fields after adding
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Optionally, show the new quote immediately by calling showRandomQuote()
      showRandomQuote();
    } else {
      alert("Please fill in both the quote and category.");
    }
  }
  
  // Add event listener to 'Add Quote' button
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);


