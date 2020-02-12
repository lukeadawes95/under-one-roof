//------------------------
// Initialize Firebase
//------------------------

//function to hide element
function hide(elemId){
	 $(elemId).addClass("hidden");
}

function show(elemId){
	$(elemId).removeClass("hidden");
}

var masterUser = {};
//---------------------------
//Personal Home Page
//---------------------------
$(document).ready(function(){
	//Menu Display
    $("#toggleMenu").click(function(){
        $("#sidebar").removeClass("hide-menu"); //If menu button is cicked, side bar is shown 
		hide(toggleMenu);
		if($(window).width() < 480){
			hide(messengerGroup);
		}
    });
     
});

function closeMenu(){
	$("#sidebar").addClass("hide-menu"); //If close button is side bar is clicked, side bare is hidden
	show(toggleMenu);
	if($(window).width() < 480){
		show(messengerGroup);
	}
	
}


//--------------------------
//Index Page
//--------------------------

$(document).ready(function(){
	//Check Passwords are Matching
	$('#txtPasswordR').keyup(function(){
		if($(this).val() == $('#txtPassword').val()){
			$('#verifynote').addClass('hidden');
			//disable Sign up button is passwords dont match
			$('button[name="btnSignUp"]').attr('disabled', false);
		}
		else{
			$('#verifynote').removeClass('hidden');
			$('button[name="btnSignUp"]').attr('disabled', true);
		}
	});
	//Checks for input in email field (disables sign up button if there's no input)
	$('button[name="btnSignUp"]').attr('disabled', true);
	$('input[type="txtEmail"]').on('keyup',function() {
		var txtEmail_val = $('input[name="txtEmail"]').val();
    	if(txtEmail_val != '') {
        	$('button[name="btnSignUp"]').attr('disabled' , false);
    	}
		else{
        	$('button[name="btnSignUp"]').attr('disabled' , true);
    	}
	});

});
  
//-------------------------
//Sign-Up
//-------------------------

//Sign up
var userType = '';

function signup(){
	var userEmail = document.getElementById("txtEmail").value; //Email input value
	var userPassword = document.getElementById("txtPassword").value; //Password input value
	var user = firebase.auth().currentUser; //Current user
	
	
	<!--Sign up user to app-->
	firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function(user) {
		//if sign up was successfull
		masterUser = user;
		var doc = document.getElementById("selectMenu");
		location = doc.options[doc.selectedIndex].value;
		
	}, function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error: " + error.message);
	});
}
<!--End of signup() function-->
  
//-------------------------
//Sign Out
//-------------------------

function signout(ele){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  var uid = ele.getAttribute('value');
	  firebase.database().ref('users/'+uid).update({"onlineStatus":"OffLine"});
	  localStorage.setItem("prop", '');
	  console.log(localStorage.getItem("prop") + " = current Property");
	  location = 'index-login.html';
	}).catch(function(error) {
	  // An error happened.
	  window.alert(error.message);
	});
}

//-------------------------
//Current Property
//-------------------------

//function to get current property
function goTo(ele){
	var firstLine = ele.getAttribute('value');
	var user = firebase.auth().currentUser;
	var ref = firebase.database().ref().child("addresses");

	ref.orderByChild("firstLine").equalTo(firstLine).once("value", function(snapshot) {
	  snapshot.forEach(function(child) {
		var currentProperty = 'nothing'
		currentProperty = child.key;
		localStorage.setItem("prop", currentProperty);
		location = 'home.html';
	  });
	});
}

function getCurrentProp(){
	var firstLine = ''
	var user = firebase.auth().currentUser;
	var ref = firebase.database().ref().child("addresses");
	var refUsers = firebase.database().ref().child("users").child(user.uid).child("rentingAddress");
	
	refUsers.child("firstLine").on('value', function(data){
		firstLine = data.val();
		console.log(firstLine);
	});
	
	ref.orderByChild("firstLine").equalTo(firstLine).once("value", function(snapshot) {
	  snapshot.forEach(function(child) {
		var currentProperty = 'nothing'
		currentProperty = child.key;
		localStorage.setItem("prop", currentProperty);
		console.log(currentProperty);
	  });
	});

	ref.orderByChild("firstLine").equalTo(firstLine).once("value", function(snapshot) {
		snapshot.forEach(function(child){
			var currentProperty = 'nothing'
			currentProperty = child.key;
			localStorage.setItem("prop", currentProperty);
			console.log(currentProperty);
		});
	});
}

function getInputVal(id){
	return document.getElementById(id);
}

function changeDate(rawDate){
var date = new Date($('#'+rawDate).val());
	day = date.getDate();
	month = date.getMonth() + 1;										
	year = date.getFullYear();
	var ePDate = [year,month,day].join('-');
	return ePDate;
}

function days(date1, date2){
	var d1 = new Date(date1);
		day1 = d1.getDate();
		month1 = d1.getMonth() ;										
		year1 = d1.getFullYear();
	var d2 = new Date(date2);
		day2 = d2.getDate();
		month2 = d2.getMonth() ;										
		year2 = d2.getFullYear();
		
	var newD1 = new Date();
	newD1.setFullYear(year1, month1, day1);
	var newD2 = new Date();
	newD2.setFullYear(year2, month2, day2);
		
	var days = (newD2 - newD1)/ 1000 /60 / 60 / 24;
	return days;
}

function newDate(date){
	var d = new Date(date);
	day = d.getDate();
	month = d.getMonth() ;										
	year = d.getFullYear();

	var newD = new Date();
	newD.setFullYear(year, month, day);
	
	return newD;
}



function addDaysPt2(date, numberOfDaysToAdd){
	var someDate = newDate(date);
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
	var dd = someDate.getDate();
	var mm = someDate.getMonth() + 1;
	var y = someDate.getFullYear();
	return y + '-' + mm + '-' + dd;
}

function passToday(paymentDate){
	var newPaymentDate = new Date(paymentDate);
	day = newPaymentDate.getDate();
	month = newPaymentDate.getMonth() ;										
	year = newPaymentDate.getFullYear();
	var x = new Date();
	x.setFullYear(year, month, day);
	
	return x
}

function capitalLetter(str){
	if(str != ''){
		str = str.split(" ");
	
		for (var i = 0, x = str.length; i < x; i++){
			str[i] = str[i][0].toUpperCase() + str[i].substr(1);
		}
	
		return str.join(" ");
	}
}

//Maintenance issue notificaion






