$('#create').on('click', ()=>{
  if(emptyNickname()){return;}

  //REQUESTING A ROOM FROM THE SERVER
  $.ajax({
    type: 'POST',
    data: {'nickname' :  $('#nickname').val()},
    url: 'http://localhost:5000/create',
    success: function(data) {
      $('html').html(data);
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});


$('#join').on('click', ()=>{
  if(emptyNickname()){return;}

  //ASKING FOR PERMISSION TO JOIN THE ROOM
  $.ajax({
    type: 'POST',
    data: {'nickname' : $('#nickname').val(), 'roomCode' :  $('#roomCode').val()},
    url: 'http://localhost:5000/join',
    success: function(data) {
      if(data.available === false){
        $('#message').text('Wrong code, check it again.');
      }
      else{
        $('html').html(data);
      }
    },
    error: function(data){
      $('#message').text('Something went wrong, check your connection!');
    }
  });

});



// HELPER FUNCTIONS
function emptyNickname(){
  if($('#nickname').val() == ""){
    $('#message').text('A nickname is required.');
    return true;
  }
  return false;
};
