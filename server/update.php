<?php
	include "connection.php";
	$id = $_POST["udi"];
	$name = $_POST["uname"];

	$home = $dbh->prepare("UPDATE tbl_users SET fld_name = :fld_name WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_name", $name);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>