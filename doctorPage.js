// get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const statusHeader = document.getElementById('status');

const login_inputs = document.getElementById('login_inputs');
const child_status = document.getElementById('child_status');

const dbRef = firebase.database().ref().child('child');

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

// listener for logout button
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// real-time listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
    login_inputs.classList.add('hide');
    child_status.classList.remove('hide')
  } else {
    console.log('not logged in');
    btnLogout.classList.add('hide');
    login_inputs.classList.remove('hide');
    child_status.classList.add('hide');
  }
});

dbRef.on('value', snap => {
  statusHeader.innerHTML = "Child Status: " + snap.val().status;
});
