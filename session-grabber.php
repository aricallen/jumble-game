<?php

/*** session-graber.php ***/

$session_password = $_POST['session_password'];

$server_root_path = $_SERVER['DOCUMENT_ROOT'];
$session_file_path = "{$server_root_path}/jumble/sessions/{$session_password}.txt";

$return_array = array();



// check to see if file exists
// return false if it doesn't

if(!is_readable($session_file_path)) {
	return false;
} else {
	// file exists
	// grab json
	$json_array = json_decode(file_get_contents($session_file_path), true);
	echo json_encode($json_array);
}



?>


