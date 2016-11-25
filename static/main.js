$( document ).ready(function() {
   $(".divregister").hide()

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

});



