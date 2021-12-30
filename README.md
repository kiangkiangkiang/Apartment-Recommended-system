# House for you - Apartment Recommended System


We combine multiple <b>machine learning algorithms</b>, <b>python crawling</b> skills, Taiwan <b>Open Datasets</b>, <b>Jeiba preprocessing</b>, 
and 591 rent website to develop an Apartment Recommended System, which is called <b>house for you</b>. For the frontend visualization, we
use <b>HTML</b>, <b>JavaScript</b>, <b>CSS</b>, and also provide statistical chart for data analysis. Through the web design and algorithm implement, 
the recommended system owns a high accuracy, which is evidenced by statistics called <b>spearman correlation</b>.

<b>House for you provides the most suitable rented apartments according to the users' favor. 
Whenever you come to an alien environment, using "house for you" can solve what you are annoyed about living.</b>


## Datasets

<div>
  
  <img src="github_img/dataset1.png" style="width:20% ;float:left" align="left">    

  We take advantage of multiple datasets in the Taiwan open datasets at https://data.gov.tw/dataset/6564, 
  and combine with the same address, which will lead into a complete data table and benefit of analysis. 
  In this way, we can facilitate the analysis of the <b>environment effective factor of the apartment</b>, 
  where the user is favor of but has no understanding yet. Quantify the factor and include into the 
  cost–performance ratio we design for the prediction.

  
  On the other hand, crawled the 591 (https://www.591.com.tw/) apartment-rented system using python until
  3 May 2019, and 5362 records have been collected. For the preprocessing, the <b>Jeiba</b> to segment Chinese words
  and <b>regular expression</b> was implemented. After the work, we will get the <b>internal effective factor of the 
  apartment</b> that renter providing, like the image in website, furnitures, and discount, etc. Likewise, Quantify the factor 
  and include into the cost–performance ratio we design for the prediction.


</div>

## Workflow

<div>
<img src="github_img/workflow_houseForu.png" style="width:20% ;float:right" align="right">   
  
  First, take the two datasets mentioned above, use <b> The World Geodetic System 1984 (WGS84) </b> to convert the 
  Latitude and Longitude, and complete the combination of data that we use for analysis. 
  <br><br>
  Second, consider the distance between the apartment and working place, we designed a <b>center location method </b>to find the most 
  suitable location for living. 
  <br><br>
  Further, implement <b>TFIDF</b> and <b>TFPDF</b> in furnitures and <b>Elo Rating System</b> in the image aesthetic level for quantify into the cost–performance. 
  <br><br>
  Final, combine the <b>kmeans</b> and <b>scatter-gather algorithms</b> to find the customized favor index for the cost–performance, and a complete apartment recommended
  list will come into the view.
  <br>  
  
</div>


## Usage
<link rel="stylesheet" href="github_img/myCSS.css">

(For center location method)

1. Input working places or destinations (recommend a complete addredd)

2. Input time limits (you can accept) respectively of the places

3. Choose the apartment you prefer for 5 times.

(For customized favor index)

After these, the recommended list will come up.


<div class="row">
  <div class="column">
    <img src="github_img/houseForu1.png"  style="width:25%">
  </div>
  <div class="column">
    <img src="github_img/houseForu2.png" style="width:25% ">   
  </div>
  <div class="column">
    <img src="github_img/houseForu3.png"  style="width:25% ">
  </div>
  <div class="column">
    <img src="github_img/houseForu4.png" style="width:25% ">    
  </div>
</div>


