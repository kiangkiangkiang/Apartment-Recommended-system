<?php
include("connect.php");
header('Content-type: text/html; charset = utf-8');
$slcdb = mysqli_select_db($db_link,"seminar");
if(!$slcdb)die("資料庫選擇失敗");

$house1num = $_POST["house1num"];

$sql_query1 = "SELECT `冷氣`, `熱水器`, `床具用品`, `衣櫃`, `冰箱`, `天然瓦斯`, `乾溼分離`, `沙發`, `陽台`, `電梯` FROM `furniture0827` WHERE `房間編號`= ".$house1num;
$sqldb1 = mysqli_query($db_link,$sql_query1);

$an = array();
foreach($sqldb1 as $item => $value)
{
	$an[]=$value;
}
echo json_encode($an);
?>