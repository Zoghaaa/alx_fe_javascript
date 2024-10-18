let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we only regret the chances we didn’t take.", category: "Regret" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Time" }
  ];

function showRandomQuote(){
   
const randomIndex = Math.floor(Math.random() * quotes.length)
const randomQuote = quotes[randomIndex]

 const displayQuote = document.getElementById('quoteDisplay')
 displayQuote.textContent = `${randomQuote.text} - ${randomQuote.category} `


}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      // Add the new quote to the quotes array
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Optionally, display the new quote immediately after adding
      showRandomQuote();
    } else {
      alert("Please fill in both the quote and category.");
    }
  }
  
  // Add event listener to 'Add Quote' button
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);


