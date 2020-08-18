window.onload = function() {
	// Retrieved from https://inorganik.github.io/countUp.js/
	var countUp = new CountUp('countup', 0, 0);
	depositUpdate();
	countUp.start();
        var depositcounter = setInterval (depositUpdate, 5000);
	function depositUpdate () {
	  getTotalDeposit().done(function(msg) {
            console.log("request result : ", msg);
            deposit = msg["totalDeposit"];
	    countUp.update(deposit);
          });
	}

	// Retrieved from https://mcatcher.github.io/2018/01/24/dday.html
	var dday = new Date("August 19, 2020 00:00:00").getTime(); // D-Day
	ddayUpdate(); // Initialize
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

// Deposit Handler
function addDepositHandler () {
  let amount = document.getElementById("depositInput").value;
  addDeposit(COINBASE, amount).done(function(msg) {
    console.log("request result : ", msg);
    result = msg["result"];
    if (result == "success") {
      alert("SUCCESS!");
      updateUserInfo();
    } else {
      alert("FAIL!");
    }
  });
}

function withdrawDepositHandler () {
  let amount = document.getElementById("depositInput").value;
  withdrawDeposit(COINBASE, amount).done(function(msg) {
    console.log("request result : ", msg);
    result = msg["result"];
    if (result == "success") {
      alert("SUCCESS!");
      updateUserInfo();
    } else {
      alert("FAIL!");
    }
  });
}

// Userinfo modal (random)
function userinfoUpdate () {
  document.getElementById("userinfo").innerHTML = `<p style="font-size: 2.2rem">Loading . . .</p>`;
  let randnum = Math.random();
  if (randnum < 0.7) {
    updateUserInfo();
  }
  else {
    selectWinnerHandler();
    /*
    // Congrats
    startConfetti();
    document.getElementById("userinfo").innerHTML = `
      <p style="font-size: 1rem">2020.08.13 ~ 2020.08.20</p>
      <p style="font-size: 2.2rem">Congratulations!</p>
    `;
    */
  }
}

function updateUserInfo() {
  getRoundNumber().done(function(msg) {
  let roundnum = msg["roundNumber"];
  getUserInfo(COINBASE).done(function(msg) {
    console.log("request result : ", msg);
    let balance = msg["balance"];
    let washCount = msg["washCount"];
    getWinningProbability(COINBASE).done(function(msg) {
      let washCountWinProb = msg["washCountWinProb"];
      let depositWinProb = msg["depositWinProb"];
      document.getElementById("userinfo").innerHTML = `
        <p style="font-size: 1rem">Round #` + roundnum + `</p>
        <p style="font-size: 2.2rem">손씻기당첨확률 ` + washCountWinProb + `%<br/>저축금당첨확률 ` + depositWinProb + `%</p>
        <p style="font-size: 1.3rem">
        - 손을 ` + washCount + `번 씻었어요.<br/>
        - 돈을 ` + balance + `원 예치해놓았어요.
        </p>
        <div class="uk-margin">
          <input id="depositInput" class="uk-input uk-form-width-medium" type="text" placeholder="저금(또는 회수)할 금액">
          <a class="uk-icon-button" uk-icon="plus-circle" onclick="addDepositHandler()"></a>
          <a class="uk-icon-button" uk-icon="minus-circle" onclick="withdrawDepositHandler()"></a>
        </div>
      `;
    });
  });
  });
}

function selectWinnerHandler() {
  getRoundNumber().done(function(msg) {
    let roundnum = msg["roundNumber"];
      selectWinner().done(function(msg) {
        getWinnersInfo(roundnum).done(function(msg) {
	  let depositWinner = msg["depositWinner"];
	  let washCountWinner = msg["washCountWinner"];
	  let winningPrizeAmount = msg["winningPrizeAmount"];
	  // TODO : Winner 가 이 account 인지를 체크한 뒤 Congrats
          // Congrats
          startConfetti();
          document.getElementById("userinfo").innerHTML = `
            <p style="font-size: 1rem">Round #` + roundnum + `</p>
            <p style="font-size: 2.2rem">Congratulations!<br/>당첨금액 ` + winningPrizeAmount/2 + `원</p>
            <p style="font-size: 1.0rem">
            - 손씻기당첨자 ` + depositWinner + `<br/>
            - 저축금당첨자 ` + washCountWinner + `
            </p>
          `;
	});
      });
  });
}
