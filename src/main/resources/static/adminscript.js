
//var stompClient = null;
//
//$(document).ready(function(){
//
//	if(stompClient!=null)
//		stompClient.disconnect();
//
//	 var socket = new SockJS('/livescore-websocket');
//	 stompClient = Stomp.over(socket);
//
//    $("button").click(function(){
//
//    	sendData2Socket();
//
//    });
//});
//
//function sendData2Socket() {
//
//
//
//	var battingTeamName = $("#battingTeamName").val();
//	var bowlingTeamName = $("#bowlingTeamName").val();
//	var totalRuns = $("#totalRuns").val();
//	var totalOvers = $("#totalOvers").val();
//
//	stompClient.send("/app/scorecard", {}, JSON.stringify({'battingTeamName': battingTeamName, 'bowlingTeamName': bowlingTeamName,
//		'totalRuns': totalRuns,'totalOvers': totalOvers}));
//
//}

//dynamic looping

var stompClient = null;

$(document).ready(function() {
  if (stompClient != null)
    stompClient.disconnect();

  var socket = new SockJS('/livescore-websocket');
  stompClient = Stomp.over(socket);

  $("button").click(function() {
    sendDataLoop();
  });
});

function sendDataLoop() {
  var battingTeamName = $("#battingTeamName").val();
  var bowlingTeamName = $("#bowlingTeamName").val();
  var totalRuns = $("#totalRuns").val();
  var totalOvers = $("#totalOvers").val();

  // Mendefinisikan variabel untuk data yang akan berubah setiap 2 detik
  var dynamicData = {
    'battingTeamName': battingTeamName,
    'bowlingTeamName': bowlingTeamName,
    'totalRuns': totalRuns,
    'totalOvers': totalOvers
  };

  // Mengirim data awal
  stompClient.send("/app/scorecard", {}, JSON.stringify(dynamicData));

  // Mengatur interval untuk mengirim data baru setiap 2 detik
  setInterval(function() {
    // Mengubah nilai-nilai data yang berubah setiap 2 detik
    dynamicData.totalRuns = getRandomValue(); // Ubah sesuai kebutuhan
    dynamicData.totalOvers = getRandomValue(); // Ubah sesuai kebutuhan

    // Mengirim data yang diperbarui
    stompClient.send("/app/scorecard", {}, JSON.stringify(dynamicData));
  }, 2000);
}

// Fungsi untuk mendapatkan nilai acak
function getRandomValue() {
  // Logika untuk menghasilkan nilai acak, sesuaikan dengan kebutuhan Anda
  return Math.floor(Math.random() * 100);
}
