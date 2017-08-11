$(document).ready(function() {
  //Variables
  var users = ["freecodecamp", "GameSpot", "TribesCast", "brunofin", "ninja", "comster404", "GiantWaffle","GamesDoneQuick"],
      URL = 'https://wind-bow.glitch.me/twitch-api/channels/',
      URLstreams = 'https://wind-bow.glitch.me/twitch-api/streams/';
  //Listen
  //Execute
  loadPage();
  //Functions

  function loadPage(){for (n=0;n<users.length;n++) {getUserInfo(users[n]);}}

  function getUserInfo(user){
      fetch(URL+user)
        .then(function(response){return response.json();})
        .then(function(j){
        if (j.display_name !== undefined){$("#userList").append('<a href="' + j.url + '" target="_blank"><li id="' + user + '"><img src="' + j.logo + '">' + j.display_name + '<span id="s' + user + '"></span></li></a>');}
        else {$("#userList").append('<li class="notfound" id="' + user + '"><img src="https://www.redtailbooks.com/codeCamp/images/noSignal.png">' + user + '<span id="s' + user + '">User Not Found</span></li>');}
      })
        .then(function(){chkStream(user);})
  }

  function chkStream(user){
    fetch(URLstreams+user)
      .then(function(response){return response.json();})
      .then(function(j){
      if ($("#s"+user).text() !== "User Not Found" ) {
        if (j.stream == null) {stream = "OFFLINE"} else {stream = j.stream.game}
        $("#s"+user).text(stream);
      }
    })
  }
});
