<?php
	include "connection.php";
	$id = $_POST["udi"];
	$npass = $_POST["npass"];

	$home = $dbh->prepare("UPDATE tbl_users SET fld_password = :fld_password WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_password", $npass);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>