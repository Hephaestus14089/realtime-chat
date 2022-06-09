$(() => {

  $('#send').click(() => {
    sendMessage({
      name: $('#name').val(),
      text: $('#message').val()
    });

    getMessages();
  });

  function addMessage(message) {
    $('#message').append(`
        <h4> ${message.name} </h4>
        <p> ${message.text} </p>
    `)
  }

  function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
      data.forEach(addMessage);
    });
  }

  function sendMessage(message) {
    $.post('http://localhost:3000/messages', message)
  }
});
