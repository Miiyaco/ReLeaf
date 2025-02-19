// Chat functionality
function initializeChat(genAI) {
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");

  function appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function handleSendMessage() {
    if (!genAI) {
      alert("AI service is still initializing. Please try again in a moment.");
      return;
    }

    const input = chatInput.value.trim();
    if (!input || sendMessage.disabled) return;

    appendMessage(input, "user");
    chatInput.value = "";
    sendMessage.disabled = true;
    sendMessage.textContent = "Sending...";

    try {
      const model = genAI.getGenerativeModel();
      const prompt = `You are a compassionate and friendly advisor. The user chooses what conversation they'd like to 
      have with you. This means it may be about mental health issues, school, life or anything random. It is your job 
      to provide the user with an appropriate response around 3 sentences that includes:
        1. A short empathetic and/or interested observation or insight about what the person shared
        2. a follow-up question to help them reflect deeper or continue the conversation

        Note: You should talk in a casual tone and make it easy for them to respond and feel comfortable. 
        You can talk like a friend but must also stay respectful and mindful. Remember to ensure 
        thee user is happy and feels better after talking to you. 
        
        Remember: if the user sends a short message, do NOT send a long response. EX: User: "i'm tired" 
        CHAT: "I'm sorry to hear that, do you want to talk about it?" Then continue the conversation
        and provide the user with the support they need. Respond to their message: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      appendMessage(response.text(), "ai");
    } catch (error) {
      console.error("Error in chat:", error);
      appendMessage(
        "I apologize, but I encountered an error. Please try again.",
        "ai"
      );
    } finally {
      sendMessage.disabled = false;
      sendMessage.textContent = "Send";
    }
  }

  sendMessage.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });
}
