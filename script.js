$(() => {

  const socket = io();
  socket.on('message', addMessage);

  $('#send').click(() => {

    if ($('#name').val() == "" || $('#message').val() == "")
      alert("empty fields are not allowed");
    else {
      sendMessage({
        name: $('#name').val(),
        text: $('#message').val()
      });
    }

    $('#name').val("");
    $('#message').val("");
  });

  getMessages();
});

function addMessage(message) {
  $('#messages').prepend(`
      <h4> ${message.name} </h4>
      <p> ${message.text} </p>
  `);
}

function getMessages() {
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addMessage);
  });
}

function sendMessage(message) {
  $.post('http://localhost:3000/messages', message);
}
