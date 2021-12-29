<?php
include("connect.php");
header("Content-type: text/html; charset = utf-8");
$slcdb = mysqli_select_db($db_link,"seminar");
if(!$slcdb)	die("資料庫選擇失敗");
$sql_query = "SELECT * FROM "."the0813";
$result = mysqli_query($db_link,$sql_query);
$an = array();
foreach($result as $item => $value)
{
	$an[]=$value;
}
echo json_encode($an);
?>