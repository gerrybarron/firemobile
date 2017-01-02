<?php
	include "connection.php";
	$id = $_POST["udi"];
	$ccname = $_POST["ccname"];
	$ccnum = $_POST["ccnum"];

	$home = $dbh->prepare("INSERT INTO tbl_contacts (fld_userID, fld_cnum, fld_cname) VALUES (:fld_userID , :fld_cnum , :fld_cname)");
	$home->bindParam(":fld_cname", $ccname);
	$home->bindParam(":fld_cnum", $ccnum);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>