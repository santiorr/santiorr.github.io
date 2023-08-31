$(function () {
  const phrases = [
    "Our manager will answer you as soon as possible!",
    "You can get detailes by calling this number: 123456789",
    "Stay in touch!",
    "Weather is beautiful today!",
    "It's a pleasure talking to you!",
  ];

  const hello = "Hello!";
  const goodbye = "Goodbye!";
  //   $("h2").css("color", "red");

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });

  $("#answers").append(`<div class="bot_answ">${hello}</div>`);

  $("#answers").click(function () {
    return false; // preventDefault and stopPropagation()
  });

  $("#question").click(function () {
    return false; // preventDefault and stopPropagation()
  });

  $("#ok").click(function () {
    let q = $("#question").val().trim();
    $("#question").val("");
    if (q != "") {
      $("#answers").append(`<div class="human_answ">${q}</div>`);

      setTimeout(function () {
        if (q.toLowerCase().includes("bye")) {
          $("#answers").append(`<div class="bot_answ">${goodbye}</div>`);
        } else if (q.toLowerCase().includes("hello")) {
          $("#answers").append(`<div class="bot_answ">${hello}</div>`);
        } else {
          function callback() {
        	 	$("#answers").append(`<div class="bot_answ">${generateAnswer()}</div>`);
          }
			 function generateAnswer() {
			 	return phrases[Math.floor(Math.random() * phrases.length)];
			 }
          callback();
        }
        let chatbot = document.getElementById("chatbot");
        $("#chatbot").animate(
          { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
          100
        );
      }, 1000);
    }

    return false; // preventDefault and stopPropagation()
  });

  function enterKey(event) {
    if (event.keyCode == 13) {
      $("#ok").click();
      return false;
    }
  }

  $("#question").keypress("keyup", enterKey);
});