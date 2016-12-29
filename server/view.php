<?php
include "connection.php";
if(isset($_GET["uID"])){
	$id = $_GET["uID"];
	$home = $dbh->prepare("SELECT * FROM tbl_home WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_userID", $id);
	$home->execute();
	$data = $home->fetch(PDO::FETCH_ASSOC); 
	echo json_encode($data);
}
if(isset($_GET["uID2"])){
	$id = $_GET["uID2"];
	$home = $dbh->prepare("SELECT * FROM tbl_users WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_userID", $id);
	$home->execute();
	$data = $home->fetch(PDO::FETCH_ASSOC); 
	echo json_encode($data);
}
if(isset($_GET["uDevice"])){
	$id = $_GET["uDevice"];
	$home = $dbh->prepare("SELECT * FROM tbl_devices WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_userID", $id);
	$home->execute();
	$data = $home->fetch(PDO::FETCH_ASSOC); 
	echo json_encode($data);
}
if(isset($_GET["uCon"])){
	$id = $_GET["uCon"];
	$home = $dbh->prepare("SELECT * FROM tbl_contacts WHERE fld_userID = :fld_userID");
	$home->bindParam(":fld_userID", $id);
	$home->execute();
	$data = $home->fetch(PDO::FETCH_ASSOC); 
	echo json_encode($data);
}

?>