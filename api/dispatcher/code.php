<?php
session_start();
$callback  = $_GET["jsoncallback"];
	if($_REQUEST['txtcaptcha']== $_SESSION['captcha_code'])
	{
		$valido =true;
	}
	else
	{
		$valido = false;
	}
	 header('Content-type: application/json');
    //echo json_encode($valido);
    echo  $respuesta = $callback."(".json_encode($valido).")";
?>
