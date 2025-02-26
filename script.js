let allChats = [];
let currentChat = [];

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = userInput.value.trim();
    
    if (message !== "") {
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user");
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);
        
        const botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot");
        botMessage.textContent = generateResponse(message);
        chatBox.appendChild(botMessage);
        
        currentChat.push({ user: message, bot: botMessage.textContent });
        
        chatBox.scrollTop = chatBox.scrollHeight;
        userInput.value = "";
    }
}

function generateResponse(message) {
    const responses = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "who are you": "I'm a ChatGPT clone! Ask me anything!",
        "what is your name": "I am ChatGPT!"
    };
    return responses[message.toLowerCase()] || "I'm not sure how to respond to that.";
}

function newChat() {
    if (currentChat.length > 0) {
        allChats.push(currentChat);
        updateChatHistory();
    }
    currentChat = [];
    document.getElementById("chatBox").innerHTML = "";
}

function updateChatHistory() {
    const chatHistoryDiv = document.getElementById("chatHistory");
    chatHistoryDiv.innerHTML = "";
    allChats.forEach((chat, index) => {
        const entry = document.createElement("div");
        entry.textContent = `Chat ${index + 1}`;
        entry.onclick = function() { loadChat(index); };
        chatHistoryDiv.appendChild(entry);
    });
}

function loadChat(index) {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    allChats[index].forEach(chat => {
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user");
        userMessage.textContent = chat.user;
        chatBox.appendChild(userMessage);
        
        const botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot");
        botMessage.textContent = chat.bot;
        chatBox.appendChild(botMessage);
    });
}