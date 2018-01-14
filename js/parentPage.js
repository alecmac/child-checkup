// get elements
const deviceNumber = document.getElementById('deviceNumber');
const statusHeader = document.getElementById('status');

const login_inputs = document.getElementById('login_inputs');
const child_status = document.getElementById('child_status');
// const dbRef = firebase.database().ref().child('child');
var deviceNum = 0;
var dbRef = firebase.database().ref().child('devices');
var childName, childRoom, childStatus;
function getDeviceNum() {

    deviceNum = deviceNumber.value;
    console.log(deviceNum);

    dbRef.on('value', snap => {
        childName = snap.val()[deviceNum].name;
        childRoom = snap.val()[deviceNum].room;
        childStatus = snap.val()[deviceNum].status;
        console.log(snap.val()[deviceNum].status);
    });
    populateInfo();

}


function populateInfo() {
    var $infoTemplate = $('.card.template').clone();
    $infoTemplate.find("#cardName").text(childName);
    $infoTemplate.find("#cardRoom").text(childRoom);
    $infoTemplate.find("#cardNum").text(deviceNum);
    $infoTemplate.find("#cardStatus").text(childStatus);
    $infoTemplate.removeClass("template");
    $('#child_status').append($infoTemplate);
}


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
