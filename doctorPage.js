// get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const logoutOption = document.getElementById('logoutOption');

const login_inputs = document.getElementById('login_inputs');
const child_status = document.getElementById('child_status');

const dbRef = firebase.database().ref().child('devices');

// add login event
btnLogin.addEventListener('click', e => {
  // get email and Password
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email,password);
  promise.catch(e => console.log(e.message));
});

$("a.logout").click(function() {
  firebase.auth().signOut();
})

// real-time listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    logoutOption.classList.remove('hide');
    login_inputs.classList.add('hide');
    child_status.classList.remove('hide')
  } else {
    console.log('not logged in');
    login_inputs.classList.remove('hide');
    child_status.classList.add('hide');
    logoutOption.classList.add('hide');
  }
});

dbRef.on('value', snap => {
  for(var i = 1; i < snap.val().length; i++) {
    var name = snap.val()[i].name;
    var room = snap.val()[i].room;
    var status = snap.val()[i].status;
    var time = snap.val()[i].time;

    document.getElementById('device' + i).innerHTML =
        "<b>Child Name:</b> " + name +
        "<br><b>Status:</b> " + status +
        "<br><b>Time Updated:</b> " + time +
        "<br><b>Room Number:</b> " + room +
        "<br><b>Device Number:</b> " + i;

    if(status == "help") {
      document.getElementById('devicec' + i).style.background = "#A30606";
    } else {
      document.getElementById('devicec' + i).style.background = "#FFF";    
    }
  }

});