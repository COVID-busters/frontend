// SERVER ADDR
const USER_SERVER = 'http://sirius.snu.ac.kr:7223/user';
const CHAIN_SERVER = 'http://sirius.snu.ac.kr:7223/blockchain';

// ACCOUNT ADDR
const COINBASE = '0xc4422d1C18E9Ead8A9bB98Eb0d8bB9dbdf2811D7';

function getUserInfo(useraddr) {
  var querydata = '{"functionName": "getUserInfo"' + ', "userAddr": "' + useraddr + '"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function addWashCount(useraddr, amount) {
  var querydata = '{"functionName": "addWashCount"' + ', "userAddr": "' + useraddr + '", "amount": ' + amount + '}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getTotalDeposit() {
  var querydata = '{"functionName": "getTotalDeposit"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getUserCount() {
  var querydata = '{"functionName": "getUserCount"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getLottoEpoch() {
  var querydata = '{"functionName": "getLottoEpoch"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getWinningProbability(useraddr) {
  var querydata = '{"functionName": "getWinningProbability"' + ', "userAddr": "' + useraddr + '"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function addDeposit(useraddr, amount) {
  var querydata = '{"functionName": "addDeposit"' + ', "userAddr": "' + useraddr + '", "amount": ' + amount + '}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function withdrawDeposit(useraddr, amount) {
  var querydata = '{"functionName": "withdrawDeposit"' + ', "userAddr": "' + useraddr + '", "amount": ' + amount + '}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getRoundNumber() {
  var querydata = '{"functionName": "getRoundNumber"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function selectWinner() {
  var querydata = '{"functionName": "selectWinner"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function getWinnersInfo(roundnum) {
  var querydata = '{"functionName": "getWinnersInfo", "roundNumber": ' + roundnum + '}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: USER_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

/*
 * blockchain
 */

function getBlockNumber() {
  var querydata = '{"functionName": "getBlockNumber"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: CHAIN_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function startMining() {
  var querydata = '{"functionName": "startMining"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: CHAIN_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}

function stopMining() {
  var querydata = '{"functionName": "stopMining"}';
  //console.log("querydata = ", querydata);
  
  return $.ajax({
      url: CHAIN_SERVER,
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata
  });
}
