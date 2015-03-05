<?php

// reading uses URL paths
$root_domain = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';

// Complete the URL
$url = $root_domain . $_SERVER['HTTP_HOST'];

// array of words to potentially jumble
$lines = file($url.'/jumble/jumble-words.txt');
$return_array = array();

for ($i=0; $i<5; $i++) {
	$rand_num = rand(0, count($lines));
	$next_word = $lines[$rand_num];
	array_push($return_array, $next_word);
}

echo json_encode($return_array);

/*
foreach ($return_array as $item){
	echo $item;
}
*/

?>
