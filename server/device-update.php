<?php
	include "connection.php";
	$id = $_POST["udi"];
	$shdname = $_POST["shdname"];
	$shdkey = $_POST["shdkey"];

	$home = $dbh->prepare("UPDATE tbl_devices SET fld_devicename = :fld_devicename, fld_devicekey = :fld_devicekey WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_devicename", $shdname);
	$home->bindParam(":fld_devicekey", $shdkey);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>