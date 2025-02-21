const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const messageInput = document.getElementById("messageInput");
const submitBtn = document.getElementById("submitBtn");
const messages = document.getElementById("messages");
const chatingMessage = document.getElementById("chatingMessage");
let mySocketID

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("chat", {
    message: messageInput.value,
    sender: sender.value,
  });
  messageInput.value = "";
});

socket.on("socketid", (socketID) => {
    mySocketID = socketID;
})

socket.on("chat", (arg, socketID) => {
  chatingMessage.innerHTML = "";
  messages.innerHTML +=
    `<div class="message ${socketID===mySocketID ? 'message-personal': null}"><strong>` +
    arg.sender +
    ": </strong>" +
    arg.message +
    "</div>";
});

messageInput.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (arg) => {
  chatingMessage.innerHTML = arg + " typing...";
});
