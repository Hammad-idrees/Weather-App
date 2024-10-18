// Function to add a message to the chat
function addMessageToChat(content, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');

  // Add a class based on sender (user or AI)
  if (sender === 'user') {
    messageElement.classList.add('user-message');
  } else if (sender === 'ai') {
    messageElement.classList.add('ai-message');
  }

  // Add the message content
  messageElement.textContent = content;
  chatMessages.appendChild(messageElement);

  // Scroll to the bottom after adding a new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send message to Gemini AI
function sendMessageToGeminiAI(message) {
  const apiKey = 'AIzaSyBCkjq9N4JGpHIPptSlz3AMOlqjlARMQz4'; // Replace with your actual API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Response Data:", data);

      // Updated to handle the response with the 'candidates' array
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        addMessageToChat(aiResponse, 'ai'); // Add AI response to chat
      } else {
        throw new Error('Unexpected response structure: ' + JSON.stringify(data));
      }
    })
    .catch(error => {
      console.error("Error:", error);
      addMessageToChat("Gemini AI: Sorry, something went wrong.", 'ai');
    });
}

// Function to handle input and submit the message
function handleChatInput() {
  const chatbotInput = document.getElementById('chatbot-input');
  const message = chatbotInput.value.trim();

  if (message) {
    // Add the user's message to the chat
    addMessageToChat(message, 'user');
    
    // Clear the input field
    chatbotInput.value = '';

    // Send the message to Gemini AI
    sendMessageToGeminiAI(message);
  }
}

// Add event listener to the submit button
document.getElementById('chatbot-submit').addEventListener('click', function () {
  handleChatInput();
});

// Add event listener for 'Enter' key press in the input field
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission or page reload
    handleChatInput();
  }
});
