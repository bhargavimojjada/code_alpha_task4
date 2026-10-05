const conversation = document.querySelector("#conversation");
const chatForm = document.querySelector("#chat-form");
const userInput = document.querySelector("#user-input");
const suggestions = document.querySelectorAll(".suggestion");

function getReply(message) {
  const normalizedMessage = message.trim().toLowerCase();

  if (normalizedMessage === "hello") {
    return "Hi!";
  } else if (normalizedMessage === "how are you") {
    return "I'm fine, thanks!";
  } else if (normalizedMessage === "bye") {
    return "Goodbye!";
  } else {
    return "I don't understand that yet. Try hello, how are you, or bye.";
  }
}

function addMessage(message, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}-message`;

  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = sender === "user" ? "You" : "Bot";

  const text = document.createElement("p");
  text.textContent = message;

  wrapper.append(label, text);
  conversation.append(wrapper);
  conversation.scrollTop = conversation.scrollHeight;
}

function sendMessage(message) {
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    return;
  }

  addMessage(cleanMessage, "user");
  addMessage(getReply(cleanMessage), "bot");

  if (cleanMessage.toLowerCase() === "bye") {
    userInput.disabled = true;
    chatForm.querySelector("button").disabled = true;
    userInput.placeholder = "Conversation ended";
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (userInput.disabled) {
    return;
  }

  sendMessage(userInput.value);
  userInput.value = "";
  userInput.focus();
});

suggestions.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.disabled) {
      return;
    }

    sendMessage(button.textContent);
    userInput.focus();
  });
});