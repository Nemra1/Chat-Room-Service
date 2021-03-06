//Setting Nickname
$('#nickname').text(localStorage.getItem("nickname"));
localStorage.removeItem("nickname");

//Styling chatBox
let totalHeight = $(window).height();
$('#chatBox').css('height', totalHeight - 200);

//Grapping essensial data
const nickname = $('#nickname').text();
const roomCode = $('#roomCode').text();

const socket = io.connect('http://localhost:5000');

//Joining the room
socket.on('initialConnection', data=>{
  socket.emit('initialConnection', {
    'nickname' : nickname,
    'roomCode' : roomCode
  })
});

//Recieving a message
socket.on('chatMessage', data=>{
  $("#chatBox").append('<br><p><strong>' + data.nickname + ': </strong>'+ decrypt(data.message, roomCode) +'</p>');
  $('#typing').text('');
});


//Sending message by button or Enter key.
$('#sendMessage').on('click', ()=>{send()});
$('#messageBox').keypress(e=>{ if(e.which == 13) {send()}});

//Sending message function
function send(){
  socket.emit('chatMessage', {
    'nickname' : nickname,
    'room' : roomCode,
    'message' : encrypt($('#messageBox').val(), roomCode)
  });
  $('#messageBox').val("");
}


//Tracking typing
$('#messageBox').keypress(e=>{
    socket.emit('typing', {
      'nickname' : nickname,
      'room' : roomCode
    });
});

//Someone else is typing
socket.on('typing', data=>{
  $('#typing').text(data.nickname + ' is typing...');
  setTimeout(()=>{
    $('#typing').text('');
  },5000);
})
