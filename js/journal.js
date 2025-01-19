document.addEventListener("DOMContentLoaded", () => {
  const newEntryInput = document.getElementById("newEntry");
  const viewEntriesButton = document.getElementById("viewEntries");

  // Save a new journal entry to local storage
  const saveEntry = (event) => {
    event.preventDefault(); // Prevent form submission reload

    const content = newEntryInput.value.trim();
    if (!content || content === "Enter reflections here") {
      alert("Please write something to save!");
      return;
    }

    // Create a new journal entry with a timestamp
    const newEntry = {
      content: content,
      time: new Date().toLocaleString(),
    };

    // Retrieve existing entries or initialize an empty array
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(newEntry);

    // Save updated entries back to local storage
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    // Reset textarea and notify the user
    newEntryInput.value = "Enter reflections here";
    alert("Entry saved!");
  };

  // View previous entries on a new page-style layout
  const viewEntries = () => {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (entries.length === 0) {
      alert("No entries found!");
      return;
    }

    // Create a new overlay for displaying entries
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#fffcf2";
    overlay.style.overflowY = "auto";
    overlay.style.padding = "20px";
    overlay.style.boxSizing = "border-box";
    overlay.style.zIndex = "1000";

    // Add a "Back" button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.style.marginBottom = "20px";
    backButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
    overlay.appendChild(backButton);

    // Add a clear entries button
    // <button id="clearEntries">Clear All Entries</button>
    const clearEntriesButton = document.createElement("button");
    clearEntriesButton.textContent = "Clear all Entries";
    clearEntriesButton.style.marginBottom = "20px";
    clearEntriesButton.className = "clearEntries";

    clearEntriesButton.addEventListener("click", () => {
      if (
        confirm(
          "Are you sure you want to clear all journal entries? This action cannot be undone."
        )
      ) {
        localStorage.clear(); // Clear all data from local storage
        alert("All entries have been cleared!");
        document.body.removeChild(overlay); // Close overlay
      }
    });
    overlay.appendChild(clearEntriesButton);
    // Add entries sorted by date (latest first)
    const sortedEntries = entries.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    sortedEntries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.style.marginBottom = "15px";
      entryDiv.style.marginLeft = "85px";
      entryDiv.style.marginRight = "85px";
      entryDiv.style.padding = "10px";
      entryDiv.style.borderBottom = "1px solid #ddd";

      const timeDiv = document.createElement("div");
      timeDiv.textContent = `Date: ${entry.time}`;
      timeDiv.style.fontSize = "14px";
      timeDiv.style.color = "#666";

      const contentDiv = document.createElement("div");
      contentDiv.textContent = entry.content;
      contentDiv.style.marginTop = "5px";
      contentDiv.style.fontSize = "16px";

      entryDiv.appendChild(timeDiv);
      entryDiv.appendChild(contentDiv);
      overlay.appendChild(entryDiv);
    });

    // Append overlay to the body
    document.body.appendChild(overlay);
  };

  // Attach event listeners
  document.querySelector("form").addEventListener("submit", saveEntry);
  viewEntriesButton.addEventListener("click", viewEntries);
});
