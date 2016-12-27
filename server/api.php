<?php
//header('Access-Control-Allow-Origin: *');
$username = "root";
$password = "";
$dbh = new PDO("mysql:host=localhost;dbname=db_fire_user", $username, $password);

$sql = "SELECT * FROM tbl_users";

$result = $dbh->query($sql)->fetchAll(PDO::FETCH_ASSOC);

$return = [];
foreach ($result as $row) {
    $return[] = [ 
        'userID' => $row['fld_id'],
        'userDname' => $row['fld_devicename'],
        'userName' => $row['fld_fname'],
        'userUname' => $row['fld_username'],
        'userPname' => $row['fld_password']
    ];
}
$dbh = null;

header('Content-type: application/json');
//echo json_encode($return);
echo json_encode($return);
?>