// Array of quote objects, each with a 'text' and 'category'
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Perseverance" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // Display the quote in the 'quoteDisplay' div using textContent
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
  
  // Function to dynamically create a form for adding new quotes
  function createAddQuoteForm() {
    // Create form elements
    const formContainer = document.createElement('div');
    
    const inputText = document.createElement('input');
    inputText.setAttribute('id', 'newQuoteText');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('placeholder', 'Enter a new quote');
  
    const inputCategory = document.createElement('input');
    inputCategory.setAttribute('id', 'newQuoteCategory');
    inputCategory.setAttribute('type', 'text');
    inputCategory.setAttribute('placeholder', 'Enter quote category');
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote); // Attach the event listener to the addQuote function
  
    // Append elements to the form container
    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);
  
    // Add the form to the body or a specific element in the DOM
    document.body.appendChild(formContainer);  // You can customize the location where the form is added
  }
  
  // Function to add a new quote to the quotes array and update the DOM
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
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to create the add-quote form when the page loads
  window.onload = function() {
    createAddQuoteForm();
  };
  