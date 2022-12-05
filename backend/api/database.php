<?php
/**
 * Created by PhpStorm.
 * User: yuqingyang
 * Date: 11/10/22
 * Time: 12:05 PM
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'cdcp1993');
define('DB_NAME', 'cis629');

function connectDb() {
    $connect = mysqli_connect(DB_HOST, DB_USER,DB_PASS, DB_NAME);
    if(mysqli_connect_errno($connect)){
        die("Failed to connect mysql database:". mysqli_connect_error());
    }

    mysqli_set_charset($connect,'utf8');

    return $connect;
}

$connection = connectDb();