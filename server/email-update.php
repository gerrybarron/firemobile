<?php
	include "connection.php";
	$id = $_POST["udi"];
	$nemail = $_POST["nemail"];

	$home = $dbh->prepare("UPDATE tbl_users SET fld_email = :fld_email WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_email", $nemail);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>