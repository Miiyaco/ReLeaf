document.addEventListener('DOMContentLoaded', () => {
    const checkAI = setInterval(() => {
        if (window.genAI) {
            clearInterval(checkAI);
            console.log("AI successfully initialized");
            initializeChat(window.genAI);
        }
    }, 500);
});

// Chat functionality
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Clear input
    chatInput.value = '';

    // Add user message
    appendMessage(message, 'user');

    try {
        // Get AI response
        const model = window.genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        // Add AI message
        appendMessage(text, 'ai');
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }
}

if (sendMessage) {
    sendMessage.addEventListener('click', handleSendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
}

// Nav bar open and close function 
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
