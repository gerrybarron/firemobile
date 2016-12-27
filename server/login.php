<?php
//error_reporting( ~E_NOTICE );
include "connection.php";
$errMSgs="";
if(isset($_POST["login"])) {
	$username = $_POST["username"];
	$password = $_POST["password"];

	if (empty($username) && empty($password)) {
		$errMSgs = "Enter your Username and Password.";
	}
	else if (empty($password)) {
		$errMSgs = "Enter your Password.";
	}
	else if (empty($username)) {
		$errMSgs = "Enter your Username.";
	}
	else{
		$login = $dbh->prepare("SELECT * FROM tbl_users WHERE fld_username = :user AND fld_password = :pass");
	$login->bindParam(":user", $username);
	$login->bindParam(":pass", $password);
	$login->execute();
	$data = $login->fetch(PDO::FETCH_ASSOC);
	if($username == $data["fld_username"] && $password == $data["fld_password"]) {
		if($data["fld_perm"] == 1){
			header('Location: home.php');
		}
	}
	else{
		$errMSgs = "Your Username or Password is incorrect.";
	}	
	}
	
}
?>