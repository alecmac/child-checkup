function savePatientInfo()
{
	var device_num = document.getElementById("device-num").value;
	var patient_name = document.getElementById("child-name").value;
	var room_num = document.getElementById("room-num").value;
	var success;
	var init_form = document.getElementById("child-login");
	var status_form = document.getElementById("child-status-form");
	var logout_button = document.getElementById("logout-button");
	
	/* DB Authenticate */
	const promise1 = firebase.auth().signInWithEmailAndPassword("a@a.com", "aaaaaa");
	promise1.catch(e => console.log(e.message));
	
	/* I should probably do a better job of error handling but this promise thing won't let me supress the success message */
	const promise2 = firebase.database().ref().child('devices2/' + device_num).set({
		patient_name: patient_name,
		status: "N/A",
		room_num: room_num
	});

	/* Not ideal because of above reason */
	promise2.catch(e => showSetupFailure());
	
	/* No need to show success message as it will auto load the next screen */
	//showSetupSuccess();
	
	init_form.style.display = "none";
	status_form.style.display = "block";
	logout_button.style.display = "block";
}

function showSetupSuccess()
{
	var success_msg = document.getElementById("init-success");
	success_msg.style.display = "block";
}

function showSetupFailure()
{
	document.getElementById('init-failure').style.display = 'block';
}

function showStatusSuccess()
{
	document.getElementById('status-success').style.display = 'block';
	setTimeout(function() {
		$('#status-success').fadeOut('fast');
	}, 2500);
	
}

function showStatusFailure()
{
	document.getElementById('status-success').style.display = 'block';
	setTimeout(function() {
		$('#status-failure').fadeOut('fast');
	}, 2500);
	
}

function updateChildStatus(child_status)
{
	var device_num = document.getElementById("device-num").value;
	const promise = firebase.database().ref('devices2/' + device_num).update({
		status: child_status
	});
	promise.catch(e => showStatusFailure());
	
	showStatusSuccess();
}

function toggleNurse()
{
	//TODO
}

function logout(){
	document.getElementById('child-login').style.display = 'block';
	document.getElementById('child-status-form').style.display = 'none';
	document.getElementById('logout-button').style.display = 'none';
	
	/*
	firebase.auth().signOut().then(function() {
	  showLogoutSuccess();
	}).catch(function(error) {
	  console.log(error.message)
	});
	*/
	
}

function showLogoutSuccess(){
	document.getElementById('logout-success').style.display = 'block';
	setTimeout(function() {
		$('#logout-success').fadeOut('fast');
	}, 2500);
}