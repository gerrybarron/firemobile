var userID=[],userDname=[],userName=[],userUname=[],userPname=[],userInfo=[];
var arycount;
$(document).ready(function()
{
    getUserStatus();
});
	
	
function validateForm() {
	var x = document.forms["myform"]["username"].value;
	var y = document.forms["myform"]["password"].value;
	var usrnm = document.forms["myform"]["username"].value;
	var psswrd = document.forms["myform"]["password"].value;

	if (x == "" && y == "") {
	    document.getElementById("errMsg").innerHTML = "Enter your Username and Password";
	    return false;
	}
	else if (x == ""){
	   	document.getElementById("errMsg").innerHTML = "Enter your Username";
	    return false;
	}
	else if (y == ""){
	   	document.getElementById("errMsg").innerHTML = "Enter your Password";
	    return false;
	}
	else if (usrnm == userUname && psswrd == userPname){
	   	document.getElementById("errMsg").innerHTML = "";
	   	document.getElementById("sccMsg").innerHTML = "Account Verified. Welcome!";
	   	return true;
	}
	else{
	   	document.getElementById("errMsg").innerHTML = "Your account or password is incorrect.";
	  	return false;
	}
}
		
function getUserStatus(){
    $.ajax({
      	type: "GET",
      	url: "http://localhost/firefinal/api.php",
      	async: false,
      	success: function(userData){
          	console.log(userData);
          	for(var i=0; i<=userData.length-1; i++){
		        userID.push(userData[i].userID);
		        userDname.push(userData[i].userDname);
		        userName.push(userData[i].userName);
		        userUname.push(userData[i].userUname);
		        userPname.push(userData[i].userPname);
		        arycount = userData.length;
        	}

      	}

    }); //end of ajax function
    console.log(arycount);
}