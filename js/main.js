// Initialize Gemini AI
document.addEventListener('DOMContentLoaded', () => {
    // Wait for genAI to be available
    const checkAI = setInterval(() => {
        if (window.genAI) {
            clearInterval(checkAI);
            // Initialize all modules
            initializeDashboard();
            initializeJournal(window.genAI);
            initializeChat(window.genAI);
            initializeMeditation();
        }
    }, 100);
});

// DOM Elements
const moodSlider = document.getElementById('moodSlider');
const moodValue = document.getElementById('moodValue');
const journalText = document.getElementById('journalText');
const submitJournal = document.getElementById('submitJournal');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const meditationBubbles = document.querySelectorAll('.meditation-bubble');
const meditationTimer = document.getElementById('meditationTimer');
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const stopMeditation = document.getElementById('stopMeditation');

// Journal functionality
if (moodSlider) {
    moodSlider.addEventListener('input', (e) => {
        moodValue.textContent = e.target.value;
    });

    submitJournal.addEventListener('click', async () => {
        if (!window.genAI) {
            alert('AI service is still initializing. Please try again in a moment.');
            return;
        }

        const mood = moodSlider.value;
        const entry = journalText.value.trim();
        
        if (!entry) return;
        
        submitJournal.disabled = true;
        submitJournal.textContent = 'Processing...';
        
        try {
            const model = window.genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = `You are a compassionate and professional AI therapist. Based on the following journal entry and mood rating (${mood}/10), provide insightful feedback and craft thoughtful, guiding questions to help the user gain deeper self-awareness and find emotional comfort. Journal entry: ${entry}`;
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            
            // Here you would typically save the journal entry and show the AI's response
            alert('Journal entry submitted successfully!\n\nAI Response:\n' + response.text());
            
            journalText.value = '';
            moodSlider.value = 5;
            moodValue.textContent = '5';
        } catch (error) {
            console.error('Error processing journal entry:', error);
            alert('An error occurred while processing your journal entry. Please try again.');
        } finally {
            submitJournal.disabled = false;
            submitJournal.textContent = 'Submit Journal Entry';
        }
    });
}

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

// Meditation functionality
let meditationInterval;

function updateTimer(duration) {
    let timeLeft = duration * 60;
    
    meditationInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(meditationInterval);
            meditationTimer.style.display = 'none';
            alert('Meditation complete!');
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerMinutes.textContent = minutes;
        timerSeconds.textContent = seconds.toString().padStart(2, '0');

        timeLeft--;
    }, 1000);
}

meditationBubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
        const duration = parseInt(bubble.getAttribute('data-duration'));
        meditationTimer.style.display = 'block';
        updateTimer(duration);
    });
});

if (stopMeditation) {
    stopMeditation.addEventListener('click', () => {
        clearInterval(meditationInterval);
        meditationTimer.style.display = 'none';
    });
}

function initializeDashboard() {
    // Dashboard initialization code here
}

function initializeJournal(genAI) {
    // Journal initialization code here
}

function initializeChat(genAI) {
    // Chat initialization code here
}

function initializeMeditation() {
    // Meditation initialization code here
}
