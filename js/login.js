document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = './index.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store current user
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                lastLogin: new Date().toISOString(),
                streakDays: user.streakDays || 0,
                lastStreak: user.lastStreak || null
            }));
            window.location.href = './index.html';
        } else {
            alert('Invalid username or password');
        }
    });

    registerButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }

        // Add new user
        users.push({
            username,
            password,
            streakDays: 0,
            lastStreak: new Date().toISOString(),
            createdAt: new Date().toISOString()
        });

        // Save updated users list
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
    });
});
