
function sendmail() {
  var MAIL_SENT = "done";

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var shuffled = iterate();
  if (shuffled) {
    var row = 7;
    for(row=2;row<12;row++) {
      var present_giver = sheet.getSheetValues(row, 1, 1, 1);    
      var address = sheet.getSheetValues(row, 2, 1, 1);
      var receiver = sheet.getSheetValues(row, 4, 1, 1);
      var advancedArgs = {name:"Present-lotterymachine",noReply:true};
      //Uncomment next line to enable email sending.
      //MailApp.sendEmail(address,"This year's Secret Santa","Hi " + present_giver +", this year 2022 you will give present to: " + receiver,advancedArgs);
      
      //Uncomment next line to send test email.
      //MailApp.sendEmail(address,"Test mail","Hi " + present_giver +", if everything goes well, you will soon get secret santa mail",advancedArgs);
      sheet.getRange(row,5).setValue(MAIL_SENT);
    }
  }
}

function different_families(families, buyer, receiver) {
 return families[buyer] != families[receiver]; 
}

function iterate() {
  var isdone = false;
  var iter = 0;
  var maxiter = 5;

  do {
    isdone = shuffle();
    iter++
  }
  while (!isdone && iter < maxiter)
  return isdone;
}

function shuffle() {
  var done = false;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var maxiter = 20;
  var present_givers = sheet.getRange(2,1,10).getValues();
  var families = sheet.getRange(2,3,10).getValues();
  var lkm = present_givers.length;
  var receivers = new Array(lkm);
  receivers.length = lkm;
  var used = new Array(lkm);
  used.length = lkm;
  for (i=0;i<used.length;i++) {
    used[i] = false;
  }

    for (i=0;i<lkm;i++) {
      var receiver = present_givers[i];
      var iter = 0;
      var found = false;
      do 
        {
        if (iter < maxiter) {
          iter++;
          var number = Math.random();
          var j = Math.round((lkm-1)*number);
          var difference = families[i]-families[j];
          if (difference != 0) {
            if (!used[j]) {
              found = true;
              receivers[j] = receiver;
              used[j] = true;
            }
          }
        }
        else {
          found=true; 
        }
      }
      while (!found)
    }
  
  done = true;
  for (i=0;i<used.length;i++) {
    if (used[i] == false) {
      done = false;
      break;
        }
    }
  if (done) sheet.getRange(2, 4, lkm, 1).setValues(receivers)
  return done;
}
