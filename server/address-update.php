<?php
	include "connection.php";
	$id = $_POST["udi"];
	$nAdd = $_POST["nadd"];
	$nPrv = $_POST["nprv"];
	$nCty = $_POST["ncty"];
	$nZip = $_POST["nzip"];

	$home = $dbh->prepare("UPDATE tbl_home SET fld_address = :fld_address, fld_province = :fld_province, fld_city = :fld_city, fld_zipcode = :fld_zipcode WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_address", $nAdd);
	$home->bindParam(":fld_province", $nPrv);
	$home->bindParam(":fld_city", $nCty);
	$home->bindParam(":fld_zipcode", $nZip);
	$home->bindParam(":fld_userID", $id);
	$home->execute(); 
?>