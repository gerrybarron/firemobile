function updateform(){
	var uname = $("#uname").val();

	$.ajax({		
		type : 'POST',
		url  : 'server/name-update.php',
		data : "uname="+uname+"&udi="+idd,
		success :  function(response){						
			console.log(response);
			Materialize.toast('Saved!', 3000, 'rounded')
			$("#u-name").text(uname);
			$("#uname").val("");
		}
	});
}

function homenameupdateform(){
	var newHname = $("#h-nname").val();

	$.ajax({		
		type : 'POST',
		url  : 'server/homename-update.php',
		data : "nhname="+newHname+"&udi="+idd,
		success :  function(response){						
			console.log(response);
			Materialize.toast('Home name changed!', 3000, 'rounded')
			$("#h-name").text(newHname);
			
		}
	});
}

function homenameupdateform(){
	var newHname = $("#h-nname").val();

	$.ajax({		
		type : 'POST',
		url  : 'server/homename-update.php',
		data : "nhname="+newHname+"&udi="+idd,
		success :  function(response){						
			console.log(response);
			Materialize.toast('Home name changed!', 3000, 'rounded')
			$("#h-name").text(newHname);
			
		}
	});
}
function homeaddupdateform(){
	var newAdd = $("#address").val();
	var newPrv = $("#province").val();
	var newCty = $("#city").val();
	var newZip = $("#zipcode").val();
	console.log(newAdd+newPrv+newCty+newZip);
	$.ajax({		
		type : 'POST',
		url  : 'server/address-update.php',
		data : "nadd="+newAdd+"&nprv="+newPrv+"&ncty="+newCty+"&nzip="+newZip+"&udi="+idd,
		success :  function(response){						
			console.log(response);
			Materialize.toast('Home Address Saved', 3000, 'rounded')
			$("#h-address").text(newZip+" "+newCty);
		}
	});
}

function emailupdateform(){
	var newEmail = $("#newEmail").val();
	var vpass = $("#upass").val();
	if (vpass == valpass) {
		$.ajax({		
			type : 'POST',
			url  : 'server/email-update.php',
			data : "nemail="+newEmail+"&udi="+idd,
			success :  function(response){						
				console.log(response);
				Materialize.toast('Saved!', 3000, 'rounded')
				$("#u-email").text(newEmail);
				$("#newEmail").val("");
				$("#upass").val("");
			}
		});
	}
	else{
		$("#errEmail").text("Password is incorrect.");
		$("#errEmail").fadeIn();
		$("#errEmail").fadeOut(5000)
	}
	
}

function passwordupdateform(){
	var newPass = $("#c-pass").val();
	var nvpass = $("#n-pass").val();
	var vpass = $("#o-pass").val();
	if (vpass == valpass && newPass == nvpass) {
		$.ajax({		
			type : 'POST',
			url  : 'server/pass-update.php',
			data : "npass="+newPass+"&udi="+idd,
			success :  function(response){						
				console.log(response);
				Materialize.toast('Password Changed!', 3000, 'rounded')
				$("#c-pass").val("");
				$("#o-pass").val("");
				$("#n-pass").val("");
			}
		});
	}
	if(newPass != nvpass){
		$("#errPass").text("Password not match.");
		$("#errPass").fadeIn();
		$("#errPass").fadeOut(5000);
	}
	if(vpass != valpass){
		$("#errPass").text("Password is incorrect");
		$("#errPass").fadeIn();
		$("#errPass").fadeOut(5000);
	}
	
}

$(document).ready(function()
{
	/* validation */
	 $("#login-form").validate({
      rules:
	  {
			password: {
			required: true,
			},
			username: {
            required: true,
            },
	   },
       messages:
	   {
            password:{
                      required: "please enter your password"
                     },
            username: "please enter your username",
       },
	   submitHandler: submitForm	
       });  
	   /* validation */
	   
	   /* login submit */
	   function submitForm()
	   {		
			var data = $("#login-form").serialize();
				
			$.ajax({
				
			type : 'POST',
			url  : 'server/login.php',
			data : data,
			beforeSend: function()
			{	
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
			},
			success :  function(response)
			   {						
					//if(response=="ok"){
					if(response > 0){
						$("#btn-login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');
						setTimeout(' window.location.href = "home.html?usrID='+response+'"; ',4000);
					}
					else{
									
						$("#error").fadeIn(1000, function(){						
				$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
											$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
									});
					}
			  }
			});
				return false;
		}
	   /* login submit */


});
