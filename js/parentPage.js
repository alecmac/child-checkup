// get elements
const deviceNumber = document.getElementById('deviceNumber');
const statusHeader = document.getElementById('status');

const login_inputs = document.getElementById('login_inputs');
const btnLogout = document.getElementById('btnLogout');

const child_status = document.getElementById('child_status');
// const dbRef = firebase.database().ref().child('child');
var deviceNum = 0;
var dbRef = firebase.database().ref().child('devices');
var childName, childRoom, childStatus;
var timeStamp;
var statusImage = "<img src=./assets/";

function getDeviceNum() {
    deviceNum = deviceNumber.value;
    console.log(deviceNum);

    dbRef.on('value', snap => {
        childName = snap.val()[deviceNum].name;
        childName = childName.substring(0,1).toUpperCase() + childName.substring(1);
        childRoom = snap.val()[deviceNum].room;
        childStatus = snap.val()[deviceNum].status;
        timeStamp = snap.val()[deviceNum].time;

        console.log(snap.val()[deviceNum].status);
        populateInfo();
        
    });
    $('#deviceNumber').val("");

    $(".login-layout").addClass('hide');

}

function populateInfo() {
    login_inputs.classList.add('hide');
    child_status.classList.remove('hide')
    btnLogout.classList.remove('hide');

    var $infoTemplate = $('#child_status .container.hide').clone();
    $infoTemplate.find("#cardName").text(childName);
    $infoTemplate.find("#cardTime").text(timeStamp);
    $infoTemplate.find("#textStatus").text(childStatus);

    $infoTemplate.find("#cardStatus").html(statusImage + childStatus + '.svg>');
    $infoTemplate.removeClass("hide");
    $('#history').removeClass('hide');
    $('#btnLogout').removeClass('hide');

    $('.appended').remove();
    $infoTemplate.addClass("appended");
    $('#child_status').append($infoTemplate);
    statusView();
}
function statusView() {
    if ($('body').css("background-image") == "none") {
        $('body').css("background-image", "none");
        $('#main').css("height", "40%");

        $('#main').css("background-color", "#f1f1f1");

    } else {
        $('body').css("background-image", 'url("../assets/bgx2.png")');
        $('#main').css("background-color", "rgba(255,255,255,0.58)");
        $('#main').css("background-color", "#f1f1f1");
        $('#main').css("height", "auto");

        




    }
}

btnLogout.addEventListener('click', e => {
    btnLogout.classList.add('hide');
    login_inputs.classList.remove('hide');
    child_status.classList.add('hide');
    $('#history').addClass('hide');
    $('#btnLogout').addClass('hide');

});
