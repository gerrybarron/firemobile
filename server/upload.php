<?php
	include "connection.php";
	//$data = file_get_contents($_FILES['u_image']['tmp_name']);
	//$data = base64_encode($data);
	$id = $_POST["uidd"];
	$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp'); // valid extensions
	$path = '../img/'; // upload directory

if(isset($_FILES['picupload']))
{
	$img = $_FILES['picupload']['name'];
	$tmp = $_FILES['picupload']['tmp_name'];
		
	// get uploaded file's extension
	$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
	
	// can upload same image using rand function
	$final_image = $id.$img;
	
	// check's valid format
	if(in_array($ext, $valid_extensions)) 
	{					
		$path = $path.strtolower($final_image);	
			
		if(move_uploaded_file($tmp,$path)) 
		{
			echo "<img src='$path' />";
		}
	} 
	else 
	{
		echo 'invalid';
	}
}
 		
	

	$home = $dbh->prepare("UPDATE tbl_users SET fld_pic = :fld_pic WHERE fld_userID = :fld_userID");
		$home->bindParam(":fld_pic", $final_image);
		$home->bindParam(":fld_userID", $id);
		$home->execute(); 
?>