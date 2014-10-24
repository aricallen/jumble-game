<?php 

/*** jumble session builder/writer ***/

$server_root_path = $_SERVER['DOCUMENT_ROOT'];


// new key and value will be grabbed from ajax call of upload page
$data_array = $_REQUEST['dataArray'];
$json_array = json_encode($data_array);


$session_name = $data_array['sessionName'];
$session_time = $data_array['sessionTime'];
$session_words = $data_array['sessionWords'];
$session_jumbles = $data_array['sessionJumbles'];

$session_file = "{$server_root_path}/jumble/sessions/{$session_name}.txt";

//echo $session_jumbles[2];

//echo $data_array['sessionJumbles'][2];
//echo $data_array['sessionWords'][2];


/*~~ Create Session File and record information ~~*/

file_put_contents($session_file, $json_array);

?>