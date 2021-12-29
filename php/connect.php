<?php
//設定mysql相關的資料
$db_host = "localhost";
$db_username = "root";
$db_password = "1234";
//與資料庫建立連線
$db_link = mysqli_connect($db_host,$db_username,$db_password);
//若連接失敗則中止程式
if(!$db_link){die("connect faliled");}
//設定相關的編碼
mysqli_query($db_link,"SET NAMES 'utf8'");
/*上面代表的意義
	SET character_set_client = utf8;
	SET character_set_results = utf8;
	SET character_set_connection = utf8;*/
?>