async function fetchDailyQuote() {
    try {
      const response = await fetch("https://zenquotes.io/api/random"); // Proxying the API request
      var data = await response.json();
      console.log(data);
      // Display the quote and author
      document.querySelector(".quote").textContent = `"${data[0].q}" — ${data[0].a}`;
    } catch (error) {
      console.error("Error fetching quote:", error);
  
      // Fallback quote in case of an error
      document.querySelector(".quote").textContent =
        "An inspiring quote will appear here soon.";
    }
  }
  
  // Fetch the quote on page load
  window.onload = fetchDailyQuote;
  