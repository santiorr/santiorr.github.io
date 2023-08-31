// Saving and getting cookie values from login form

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

let login = document.querySelector(".login_btn");

login.addEventListener("click", () => {
    let email = document.querySelector(".login_form input[type='email']").value;
    let uName = document.querySelector(".login_form input[name='username']").value;
    let password = document.querySelector(".login_form input[type='password']").value;
    let rememberMe = document.querySelector(".login_form input[type='checkbox']").checked;
    if (rememberMe) {
        setCookie("email", email, 30);
		  setCookie("username", uName, 30);
        setCookie("password", password, 30);
    }
		alert("You logged in succesfully, " + uName + "!");
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
   alert("Welcome again, " + username + "!");
  } else {
	alert("You hadn't log in yet!");
	modal.style.display = "block";
  }
}

// Login form display
var modal = document.getElementById('loginForm');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}