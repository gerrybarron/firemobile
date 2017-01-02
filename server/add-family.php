<?php
	include "connection.php";
	$id = $_POST["udi"];
	$fmname = $_POST["fmname"];
	$fmemail = $_POST["fmemail"];

	$home = $dbh->prepare("INSERT INTO tbl_family (fld_userID, fld_fmname, fld_femail) VALUES (:fld_userID , :fld_fmname , :fld_femail)");
	$home->bindParam(":fld_fmname", $fmname);
	$home->bindParam(":fld_femail", $fmemail);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>