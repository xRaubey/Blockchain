<?php
/**
 * Created by PhpStorm.
 * User: yuqingyang
 * Date: 11/10/22
 * Time: 12:15 PM
 */

require 'database.php';

$users = [];
$sql = "SELECT * FROM users";

if($result = mysqli_query($connection,$sql)){
    $i=0;
    while($row = mysqli_fetch_assoc($result)){
        $users[$i]['id']= $row['id'];
        $users[$i]['account']= $row['account'];
        $users[$i]['psw']= $row['psw'];
        $i++;
    }

    echo json_encode($users);
}

else{
    http_response_code(404);
}