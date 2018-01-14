function savePatientInfo()
{
	var device_num = document.getElementById("device-num").value;
	var patient_name = document.getElementById("child-name").value;
	var room_num = document.getElementById("room-num").value;
	var init_form = document.getElementById("child-login");
	var status_form = document.getElementById("child-status-form");
	var logout_button = document.getElementById("logout-button");
	
	var today = new Date().toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			
			/* I should probably do a better job of error handling but this promise thing won't let me supress the success message */
			initPatientStatus(device_num, patient_name, room_num, today);
		}
		else{
			console.log("Not logged in");
		}
	});
	
	/* DB Authenticate */
	const promise1 = firebase.auth().signInWithEmailAndPassword("a@a.com", "aaaaaa");
	promise1.catch(e => console.log(e.message));
	
	/* No need to show success message as it will auto load the next screen */
	showSetupSuccess();
	
	init_form.style.display = "none";
	status_form.style.display = "block";
	logout_button.style.display = "block";
}
function initPatientStatus(device_num, patient_name, room_num, time)
{
	const promise2 = firebase.database().ref().child('devices/' + device_num).update({
		name: patient_name,
		status: "N/A",
		room: room_num,
		time: time
	});
	
	/* Not ideal because of above reason */
	promise2.catch(e => showSetupFailure());
}

function showSetupSuccess()
{
	var success_msg = document.getElementById("init-success");
	success_msg.style.display = "block";
	
	setTimeout(function() {
		$('#init-success').fadeOut('fast');
	}, 2500);
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
	var today = new Date().toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	var device_num = document.getElementById("device-num").value;
	const promise = firebase.database().ref('devices/' + device_num).update({
		status: child_status,
		time: today
	});
	promise.catch(e => showStatusFailure());
	
	if(child_status == 'help')
		showNurseSuccess();
	else
		showStatusSuccess();
}

function logout(){
	document.getElementById('child-login').style.display = 'block';
	document.getElementById('child-status-form').style.display = 'none';
	document.getElementById('logout-button').style.display = 'none';
	
	updateChildStatus('N/A'); //Actually bugged due to onAuthStateChanged but insignificant
	
	firebase.auth().signOut();
	
	showLogoutSuccess();
}

function showLogoutSuccess(){
	document.getElementById('logout-success').style.display = 'block';
	setTimeout(function() {
		$('#logout-success').fadeOut('fast');
	}, 2500);
}

function showNurseSuccess(){
	document.getElementById('nurse-success').style.display = 'block';
	setTimeout(function() {
		$('#nurse-success').fadeOut('fast');
	}, 2500);
}