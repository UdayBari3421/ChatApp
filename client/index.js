var socket = io();

let username = "";
const joinChatButton = document.getElementById("join-chat");
const userNameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.querySelector(".messages-container");

joinChatButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  username = userNameInput.value;
  console.log(username);
  if (username) {
    form.style.display = "none";
    chatRoomContainer.style.display = "flex";
  }
});

function renderMessage(dataObj, typeOfMsg) {
  const div = document.createElement("div");
  div.innerText = `${dataObj.username} : ${dataObj.message}`;
  if (typeOfMsg === "SENT") {
    div.setAttribute("class", "message sent");
  } else if (dataObj.isUserActive === false) {
    div.setAttribute("class", "message receive center");
    div.innerText = `${dataObj.username} left`;
  } else {
    div.setAttribute("class", "message receive");
  }
  messageContainer.append(div);
  messageInput.value = "";
  messageInput.focus();
}

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let data = {
    id: socket.id,
    message: messageInput.value,
    username: username,
    isUserActive: true,
  };
  socket.emit("message", data);
  renderMessage(data, "SENT");
});

socket.on("message", (data) => {
  if (socket.id !== data.id) {
    renderMessage(data, "REC");
  }
});

socket.isUserActive = false;
