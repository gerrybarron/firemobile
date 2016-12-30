<?php
	include "connection.php";
	$id = $_POST["udi"];
	$nhname = $_POST["nhname"];

	$home = $dbh->prepare("UPDATE tbl_home SET fld_homename = :fld_homename WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_homename", $nhname);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>