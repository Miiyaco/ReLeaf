const { quotes } = window;
console.log(window);
// Function to display a random quote
function displayRandomQuote() {

  const randomIndex = Math.floor(Math.random() * window.quotes.length);
  const randomQuote = window.quotes[randomIndex];

  document.getElementById("quote").textContent = `"${randomQuote.text}"`;
  document.getElementById("author").textContent = `- ${randomQuote.author}`;
}

// Display a random quote when the page loads
document.addEventListener("DOMContentLoaded", displayRandomQuote);

// Display a random quote when the page loads
document.addEventListener("DOMContentLoaded", displayRandomQuote);
  