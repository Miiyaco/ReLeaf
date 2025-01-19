const { quotes } = window;

// Function to display a random quote
function displayRandomQuote() {

  const randomIndex = Math.floor(Math.random() * window.quotes.length);
  const randomQuote = window.quotes[randomIndex];

  document.getElementById("quote").textContent = `"${randomQuote.text}"`;
  document.getElementById("author").textContent = `- ${randomQuote.author}`;
}

// Function to initialize user interface
function initializeUserInterface() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    loginButton.addEventListener('click', () => {
        window.location.href = './login.html';
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        checkLoginStatus();
    });
}

// Function to check login status and update UI
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userDisplay = document.getElementById('userDisplay');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const streakCount = document.getElementById('streakCount');

    if (currentUser) {
        // User is logged in
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-flex';
        welcomeMessage.textContent = `Welcome back, ${currentUser.username}!`;
        streakCount.textContent = currentUser.streakDays || 0;

        // Update streak if needed
        updateStreak(currentUser);
    } else {
        // User is not logged in
        loginButton.style.display = 'inline-flex';
        logoutButton.style.display = 'none';
        userDisplay.textContent = '';
        welcomeMessage.textContent = 'Welcome to ReLeaf';
        streakCount.textContent = '0';
    }
}

// Function to update user streak
function updateStreak(user) {
    const today = new Date();
    const lastStreak = user.lastStreak ? new Date(user.lastStreak) : null;

    if (lastStreak) {
        const daysSinceLastStreak = Math.floor((today - lastStreak) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastStreak === 1) {
            // Increment streak
            user.streakDays = (user.streakDays || 0) + 1;
        } else if (daysSinceLastStreak > 1) {
            // Reset streak
            user.streakDays = 0;
        }
    }

    // Update last streak date
    user.lastStreak = today.toISOString();
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Update display
    const streakCount = document.getElementById('streakCount');
    streakCount.textContent = user.streakDays || 0;
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    displayRandomQuote();
    initializeUserInterface();
    checkLoginStatus();
});