window.onload = function() {
	// Retrieved from https://inorganik.github.io/countUp.js/
	var countUp = new CountUp('countup', 0, 936215);
	countUp.start();

	// Retrieved from https://mcatcher.github.io/2018/01/24/dday.html
	var dday = new Date("August 19, 2020 00:00:00").getTime(); // D-Day
	ddayUpdate();
	var ddaytimer = setInterval (ddayUpdate, 1000);
	function ddayUpdate () {
	  var today = new Date(); // current time
	  today = today.getTime(); // milliseconds
	  var day_diff = dday - today;

	  var d = Math.floor(day_diff / (1000 * 60 * 60 * 24));
	  var h = Math.floor((day_diff / (1000 * 60 * 60)) % 24);
	  var m = Math.floor((day_diff / (1000 * 60)) % 60);
	  var s = Math.floor((day_diff / 1000) % 60);

	  if (day_diff <= 0) {
	    document.getElementById("dday").innerHTML = "D-day";
	  } else {
	    document.getElementById("dday").innerHTML = "다음 추첨까지 " + d + "일 " + h + "시간 " + m + "분 " + s + "초";
	  }
	}
}
