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

        // Event handler for modal beforehide
        UIkit.util.on('#modal-userinfo', 'beforehide', (e) => {
          stopConfetti();
        })
}

// Userinfo modal (random)
function userinfoUpdate () {
  let randnum = Math.random();
  if (randnum < 0.7) {
    document.getElementById("userinfo").innerHTML = `
      <p style="font-size: 1rem">2020.08.13 ~ 2020.08.20</p>
      <p style="font-size: 2.2rem">&#x1F389; 당첨확률 31.5%</p>
      <p style="font-size: 1.3rem">
      &#x1F44F;&#x1F3FB; 손을 N번 씻었어요.<br/>
      &#x1F4B0; 돈을 N원 예치해놓았어요.
             </p>
    `;
  }
  else {
    // Congrats
    startConfetti();
    document.getElementById("userinfo").innerHTML = `
      <p style="font-size: 1rem">2020.08.13 ~ 2020.08.20</p>
      <p style="font-size: 2.2rem">&#x1F389; Congratulations!</p>
    `;
  }
}
