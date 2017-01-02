<?php
	include "connection.php";
		$username = $_POST["remail"];
		$password = $_POST["pass"];

		$login = $dbh->prepare("SELECT * FROM tbl_users WHERE fld_email = :user AND fld_password = :pass");
		$login->bindParam(":user", $username);
		$login->bindParam(":pass", $password);
		$login->execute();
		$data = $login->fetch(PDO::FETCH_ASSOC);

		if($username == $data["fld_email"]) {
			echo "Email address already registered";
		}
		else if(empty($username)){
		echo "Please enter a valid email address";
		}
		else if(empty($password)){
			echo "Please enter the password for your F.I.R.E account";
		}
		else{
			$home = $dbh->prepare("INSERT INTO tbl_users (fld_email, fld_password) VALUES (:fld_email , :fld_password)");
			$home->bindParam(":fld_email", $username);
			$home->bindParam(":fld_password", $password);
			$home->execute();

			$user = $dbh->prepare("SELECT * FROM tbl_users WHERE fld_email = :user AND fld_password = :pass");
			$user->bindParam(":user", $username);
			$user->bindParam(":pass", $password);
			$user->execute();
			$data1 = $user->fetch(PDO::FETCH_ASSOC);

			$uhome = $dbh->prepare("INSERT INTO tbl_home (fld_userID) VALUES (:fld_userID)");
			$uhome->bindParam(":fld_userID", $data1["fld_userID"]);
			$uhome->execute();

			$udevice = $dbh->prepare("INSERT INTO tbl_devices (fld_userID) VALUES (:fld_userID)");
			$udevice->bindParam(":fld_userID", $data1["fld_userID"]);
			$udevice->execute();

			$ufamily = $dbh->prepare("INSERT INTO tbl_family (fld_userID) VALUES (:fld_userID)");
			$ufamily->bindParam(":fld_userID", $data1["fld_userID"]);
			$ufamily->execute();

			$ucontact = $dbh->prepare("INSERT INTO tbl_contacts (fld_userID) VALUES (:fld_userID)");
			$ucontact->bindParam(":fld_userID", $data1["fld_userID"]);
			$ucontact->execute();
			
			echo "Account successfully registered.";
		}
	
?>