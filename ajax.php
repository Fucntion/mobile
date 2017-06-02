<?php 
    header("Content-type: text/html; charset=utf-8"); 

function get_content($url, $cookie="") { 
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_HEADER, 0); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    //curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie); //读取cookie 
    $rs = curl_exec($ch); //执行cURL抓取页面内容 
    curl_close($ch); 
    return $rs; 
} 



    $url = 'http://www.icloudinn.com:8080/yunsu-mobile-webapp/Server/user/getSignature?account='.urlencode($_GET['identifier']);
	$result = get_content($url);
	echo $result;	