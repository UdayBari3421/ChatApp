let username = "";
const joinChatButton = document.getElementById("join-chat");
const userNameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");

joinChatButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  username = userNameInput.value;
  console.log(username);
  if (username) {
    form.style.display = "none";
    chatRoomContainer.style.display = "none";
  }
});
