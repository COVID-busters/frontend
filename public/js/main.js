let dday = 0;
let day_diff = 1;
let timerOn = false;

window.onload = function() {
  // Retrieved from https://inorganik.github.io/countUp.js/
  var countUp = new CountUp('countup', 0, 0);
  var countUser = new CountUp('countuser', 0, 0);
  depositUpdate();
  userUpdate();
  countUp.start();
  countUser.start();
  var depositcounter = setInterval (depositUpdate, 5000);
  var usercounter = setInterval (userUpdate, 5000);
  function depositUpdate () {
    getTotalDeposit().done(function(msg) {
    deposit = msg["totalDeposit"];
    countUp.update(deposit);
    });
  }
  function userUpdate () {
    getUserCount().done(function(msg) {
    usernum = msg["userCount"];
    countUser.update(usernum);
    });
  }

  // Retrieved from https://mcatcher.github.io/2018/01/24/dday.html
  ddayUpdate ();

  // Event handler for modal beforehide
  UIkit.util.on('#modal-userinfo', 'beforehide', (e) => {
    stopConfetti();
  })
  UIkit.util.on('#modal-counter', 'beforehide', (e) => {
    stopTimer();
  })

  document.getElementById("useraddr_label").innerHTML = COINBASE.substring(0, 15) + "...";
}

function ddayUpdate () {
  let blockNumber = 0;
  let lottoEpoch = 0;
  getBlockNumber().done(function(msg) {
    blockNumber = msg["blockNumber"];
    getLottoEpoch().done(function(msg) {
      lottoEpoch = msg["lottoEpoch"];
      // 받아온 blockNumber, lottoEpoch 이용해 target dday 설정
      let current = new Date();
      let blockdiff = blockNumber % (lottoEpoch + 1);
      if (blockdiff > 0) blockdiff = lottoEpoch + 1 - blockdiff;
      dday = current.getTime() + blockdiff*60000;
      remainTimeUpdate(); // Initialize
      if (!timerOn) {
        var ddaytimer = setInterval (remainTimeUpdate, 1000);
        timerOn = true;
      }
    });
  });
}

function remainTimeUpdate () {
  var today = new Date(); // current time
  today = today.getTime(); // milliseconds
  day_diff = dday - today;
  var d = Math.floor(day_diff / (1000 * 60 * 60 * 24));
  var h = Math.floor((day_diff / (1000 * 60 * 60)) % 24);
  var m = Math.floor((day_diff / (1000 * 60)) % 60);
  var s = Math.floor((day_diff / 1000) % 60);
  if (day_diff <= 0) {
    document.getElementById("dday").innerHTML = "추첨이 진행됩니다! 결과를 확인해주세요.";
  } else {
    document.getElementById("dday").innerHTML = "다음 추첨까지 약 " + d + "일 " + h + "시간 " + m + "분 " + s + "초";
  }
}

// Deposit Handler
function addDepositHandler () {
  let amount = document.getElementById("depositInput").value;
  addDeposit(COINBASE, amount).done(function(msg) {
    //console.log("request result : ", msg);
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
    //console.log("request result : ", msg);
    result = msg["result"];
    if (result == "success") {
      alert("SUCCESS!");
      updateUserInfo();
    } else {
      alert("FAIL!");
    }
  });
}

// Userinfo modal
function userinfoUpdate () {
  document.getElementById("userinfo").innerHTML = `<p style="font-size: 2.2rem">Loading . . .</p>`;
  if (day_diff > 0) {
    updateUserInfo();
  }
  else {
    selectWinnerHandler();
  }
}

function updateUserInfo() {
  getRoundNumber().done(function(msg) {
  let roundnum = msg["roundNumber"];
  getUserInfo(COINBASE).done(function(msg) {
    //console.log("request result : ", msg);
    let balance = msg["balance"];
    let washCount = msg["washCount"];
    getWinningProbability(COINBASE).done(function(msg) {
      let washCountWinProb = msg["washCountWinProb"];
      let depositWinProb = msg["depositWinProb"];
      document.getElementById("userinfo").innerHTML = `
        <p style="font-size: 1rem">Round #` + roundnum + `</p>
        <p style="font-size: 2.2rem">손씻기당첨확률 ` + Math.round(washCountWinProb) + `%<br/>저축금당첨확률 ` + Math.round(depositWinProb) + `%</p>
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
	  if (COINBASE == depositWinner || COINBASE == washCountWinner) {
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
	  }
	  else {
            document.getElementById("userinfo").innerHTML = `
              <p style="font-size: 1rem">Round #` + roundnum + `</p>
              <p style="font-size: 2.2rem">다음기회에 ㅠ_ㅠ<br/>당첨금액 ` + winningPrizeAmount/2 + `원</p>
              <p style="font-size: 1.0rem">
              - 손씻기당첨자 ` + depositWinner + `<br/>
              - 저축금당첨자 ` + washCountWinner + `
              </p>
            `;
	  }
	  // 다시 현재 블록과 에폭을 받아와서 dday 재설정
	  ddayUpdate();
	});
      });
  });
}
