// get elements
const deviceNumber = document.getElementById('deviceNumber');
const statusHeader = document.getElementById('status');

const login_inputs = document.getElementById('login_inputs');
const child_status = document.getElementById('child_status');
// const dbRef = firebase.database().ref().child('child');
var deviceNum = 0;
var dbRef = firebase.database().ref().child('devices/' + deviceNum);

function getDeviceNum() {

    deviceNum = deviceNumber.value;
    console.log(deviceNum);
    dbRef = firebase.database().ref().child('devices/' + deviceNum);
    
    console.log(dbRef);
}


console.log(dbRef);

dbRef.on('value', snap => {
    console.log(snap.val());
});


// const dbRef = firebase.database().ref().child('devices/' + deviceNum);
// dbRef.on('value', snap => {
//     console.log(snap.val());
    
//     if(deviceNum != null) {
//         const dbRefDevice = dbRef.child(deviceNum);
//         dbRefDevice.on('value', snap => {
//             console.log(snap.val());
//         });
//     }
    // var status = snap.val().status;
    // console.log(status);
// });

