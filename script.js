const usercurrentDate = document.getElementById('currentDay');

userCurrentDate = moment().format("MMM Do YY");

usercurrentDate.append(userCurrentDate);

let userToDoList = [];

for (time = 9; time <= 17; time++) {
    let userID = time - 9;
    let AMorPM = "";
    let userHour = 0;
    let userDataOBJ = "";
    if (time == 12) {
      userHour = 12;
      AMorPM = "pm";
    } else if (time > 12) {
      userHour = time - 12;
      AMorPM = "pm";
    } else if (time < 12) {
      userHour = time;
      AMorPM = "am";
    }
    userHour = userHour.toString();
    userDataOBJ = {
      userID: userID,
      time: time,
      userHour: userHour,
      AMorPM: AMorPM,
      userDataOBJ: userDataOBJ,
    };
    userToDoList.push(userDataOBJ);
}

userToDoList.forEach(function(hour) {
    let timeDisplay = $("<form>");
    timeDisplay.addClass("row");
    $(".container").append(timeDisplay);
  
    let timeDivEl = $("<div>");
    timeDivEl.addClass("col-md-1 hour");
    timeDivEl.text(hour.userHour + hour.AMorPM);
  
    let userInput = $("<div>");
    userInput.addClass("col-md-10 description");
  
    let userHourData = $("<textarea>");
    userHourData.attr("userID", hour.userID);
  
    if (hour.time == moment().format("HH")) {
      userHourData.addClass("present");
    } 
    else if (hour.time<moment().format("HH")) {
      userHourData.addClass("past");
    } 
    else if (hour.time>moment().format("HH")) {
      userHourData.addClass("future");
    }
    userInput.append(userHourData);
    let saveDisplay = $("<i class='save'></i>");
    let userSave = $("<button>").addClass("col-md-1 saveBtn");
    userSave.append(saveDisplay);
    timeDisplay.append(timeDivEl, userInput, userSave);
});

plannerdisplay = function() {
    userToDoList.forEach(function (hour) {
      $("#" + hour.userID).val(hour.userDataOBJ);
    });
}
saveUserData = function() {
    localStorage.setItem("usersavedPlanner", JSON.stringify(userToDoList));
}
loadSavedUserData = function() {
    let data = JSON.parse(localStorage.getItem("usersavedPlanner"));
    if (data) {
      userToDoList =data;
    }
    saveUserData();
    plannerdisplay();
}

$("#clearbutton").on("click", function () {
    localStorage.clear();
    $(".description").text("");
});
  
$(".saveBtn").on("click", function (event) {
    event.preventDefault();

    let userIndex = $(this).siblings(".description").children().attr("userID");

    userToDoList[userIndex].userDataOBJ=$(this).siblings(".description").children().val();
    saveUserData();
    
    plannerdisplay();
});
loadSavedUserData();