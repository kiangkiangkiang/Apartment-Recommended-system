<?php
include("connect.php");
header('Content-type: text/html; charset = utf-8');
$slcdb = mysqli_select_db($db_link,"seminar");
if(!$slcdb)die("資料庫選擇失敗");

$weight_rank = $_POST["weight_rank"];
$userWeightRank = $_POST["userWeightRank"];
$variable_sp = $_POST["variable_sp"];
$PR = $_POST["PR"];
$userAge_data = $_POST["userAge_data"];
$outside_data = $_POST["outside_data"];
$page4_rank = $_POST["page4_rank"];

$sql_query = "INSERT INTO `testrecord`(`內部權重`, `外部權重`, `坪數權重`, `圖片權重`, `價格權重`, `內部權重自選`, `外部權重自選`, `坪數權重自選`, `圖片權重自選`, `價格權重自選`, `權重結果對自選排名之spearman`, `推薦房屋在使用者心中之排名`, `公共設施居住意願排名`, `交通節點居住意願排名`, `商店居住意願排名`, `鄰避設施居住意願排名`, `保健醫療居住意願排名`, `警察居住意願排名`, `宗教居住意願排名`, `圖片A`, `圖片B`, `圖片C`, `圖片D`, `圖片E`, `圖片F`, `圖片G`, `圖片H`, `使用者年齡`) VALUES (".$weight_rank[0].",".$weight_rank[1].",".$weight_rank[2].",".$weight_rank[3].",".$weight_rank[4].",".$userWeightRank[0].",".$userWeightRank[1].",".$userWeightRank[2].",".$userWeightRank[3].",".$userWeightRank[4].",".$variable_sp.",".$PR.",".$outside_data[0].",".$outside_data[1].",".$outside_data[2].",".$outside_data[3].",".$outside_data[4].",".$outside_data[5].",".$outside_data[6].",".$page4_rank[0].",".$page4_rank[1].",".$page4_rank[2].",".$page4_rank[3].",".$page4_rank[4].",".$page4_rank[5].",".$page4_rank[6].",".$page4_rank[7].",".'"'.$userAge_data.'"'.")";

$sqldb = mysqli_query($db_link,$sql_query);
if($sqldb)
	{
		echo "success";
	}
else{
	echo $sql_query;
}

?>