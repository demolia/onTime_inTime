$(document).ready(function() {
  startTime()

  var currentTime
  var hourNow 

  function checkTime(i) {
  	if (i < 10) {
  		i = "0" + i
    };  // add zero in front of numbers < 10
    	return i;
    }
  
  function startTime() {

    const weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April'";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";



    currentTime= new Date(); 


    let date = currentTime.getDate();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let days = weekday[currentTime.getDay()];
    let month = months[currentTime.getMonth()];
    let year = currentTime.getFullYear();


    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById('time').innerHTML = hours + ":" + minutes + ":" + seconds;
    document.getElementById('weekdays').innerHTML = days;
    document.getElementById('date').innerHTML = date + " " + month + " " + year;
    var t = setTimeout(startTime, 500);


  }

  // setInterval(function () {

  //   var d       = new Date();
  //   var hour    = d.getHours();  /* Returns the hour (from 0-23) */
  //   hour = checkTime(hour);
  //   var minutes     = d.getMinutes();  /* Returns the minutes (from 0-59) */
  //   minutes = checkTime(minutes);
  //   var result  = hour + ":"  + minutes;
  //   var hourNow = result.toString();
  


  //   $.post("/currenttime", {time: hourNow}, function (responsedata) {
  //     console.log("post made " + hourNow)
  //   })
    
  // }, 60000)
  

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
        };  // add zero in front of numbers < 10
        return i;
      }


    }


    $(".divregister").hide()

    $(".divlogin").hide()

    $('.registerform').click(function(){ showregister(); return false; })

    function showregister() {
	// To Hide Div Block
	$(".divlogin").hide()
	// To show Div Block
	$(".divregister").show()
    }

$('.loginform').click(function(){ showlogin(); return false; })

    function showlogin() {
	// To Hide Div Block
	   $(".divregister").hide()
	// To show Div Block
	   $(".divlogin").show()
    }
})





