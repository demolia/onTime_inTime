
$(document).ready(function() {
    startTime()

    function startTime() {
        var currentTime= new Date();
        var h = currentTime.getHours();
        var m = currentTime.getMinutes();
        var s = currentTime.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('timer').innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        };  // add zero in front of numbers < 10
        return i;
    }
})
