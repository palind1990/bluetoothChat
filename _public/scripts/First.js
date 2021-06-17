var socket = io();

socket.on("connect", function () {
  var nRoom = "nRoom";
  socket.emit("nRoom", nRoom);

  var pRoom = "pRoom";
  socket.emit("pRoom", pRoom);
});

// First
var nBtn = document.getElementById("nBtn");
var nTxt = document.getElementById("nTxt");
var nMessages = document.getElementById("nMessages");

nBtn.addEventListener("click", function () {
  socket.emit("node new message", nTxt.value);
});
socket.on("node news", function (data) {
  nMessages.innerHTML = nMessages.innerHTML + "<br>" + data;
});
socket.on("node new user", function (data) {
  nMessages.innerHTML = nMessages.innerHTML + "<br>" + data;
});
