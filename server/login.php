<?php
//error_reporting( ~E_NOTICE );
include "connection.php";

if(isset($_POST["login"])) {
	$username = $_POST["username"];
	$password = $_POST["password"];

	$login = $dbh->prepare("SELECT * FROM tbl_users WHERE fld_email = :user AND fld_password = :pass");
	$login->bindParam(":user", $username);
	$login->bindParam(":pass", $password);
	$login->execute();
	$data = $login->fetch(PDO::FETCH_ASSOC);
	if($username == $data["fld_email"] && $password == $data["fld_password"]) {
		//if($data["fld_perm"] == 1){
		//	header('Location: home.php');
		//}
		echo $data["fld_userID"];
	}
	else if(empty($username)){
		echo "Please enter a valid email address";
	}
	else if(empty($password)){
		echo "Please enter the password for your F.I.R.E account";
	}
	else{
		echo "Username or password incorrect";
	}
}
?>