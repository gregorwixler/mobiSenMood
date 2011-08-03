<?PHP
  	header('Cache-Control: no-cache, must-revalidate');
	header('Content-type: application/json');
  
$SOAPclient = new SOAPClient('http://YourMoodleServer/wspp/wsdl_pp.php');

// --- fixed vars or quick debugging and testing w/o a client --  
//  $function_tag='get_my_courses';
//  $login='Username';
//  $pass='Password';
//--------------------------------------------------  

$login=$_GET['user'];
$pass=$_GET['pass'];

// --- Check parameters for arrays (strings with commas in them) and if there are any, extract their values from the GET-String

// !!!! Now obsolete with the new WSPP server. Array inputs are now not needed, as the server simply takes all availible courses for the user. Filtering is done in SenMood

// if (substr_count(urldecode($_GET["param1"]),":") >0) {
	// $param1 = array($_GET["name_param1"]=>explode(":",urldecode($_GET["param1"])));
	// }
// else {
	// $param1 = array($_GET["name_param1"]=>$_GET["param1"]);
	// }
	
// if (substr_count(urldecode($_GET["param2"]),":") >0) {
	// $param2 = array($_GET["name_param2"]=>explode(":",urldecode($_GET["param2"])));
	// }
// else {
	// $param2 = array($_GET["name_param2"]=>$_GET["param2"]);
	// }
	
// if (substr_count(urldecode($_GET["param3"]),":") >0) {
	// $param3 = array($_GET["name_param3"]=>explode(":",urldecode($_GET["param3"])));
	// }
// else {
	// $param3 = array($_GET["name_param3"]=>$_GET["param3"]);
	// }

// ------- End of Check parameters ---------

// ----- START SOAP Login ----
// -- Login to the SOAP server and get the temporary client Nr and the session key
try {
  $SOAPlogin =$SOAPclient->login($login,$pass);
}
catch (SOAPFault $f) {
  print $f->faultstring;
}
// --- END SOAP Login -----


// ---- START Querry SOAP server ----
// -- Querries the SOAP server with the methond and the params from GET ---
// -- Convert SOAP XML to JSON after the Data was recieved ------- 

try {
// Now Obsolete with the new WSPP server 

$output=$SOAPclient->$_GET['wspp']($SOAPlogin->client,$SOAPlogin->sessionkey,$_GET["param1"],$_GET["param2"],$_GET["param3"]);
echo json_encode($output);

}
	catch (SOAPFault $f) {
 	print $f->faultstring;
}
?>