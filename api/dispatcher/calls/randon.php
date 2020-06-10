<?php
$callback  = $_GET["jsoncallback"];
		$str='';
	    $chars = "abcdefghijklmnpqrstuvwxyz123456789";
	    $size = strlen($chars);
	    for ($i = 0; $i < 6; $i++) {
	        $str .= $chars[rand(0, $size - 1)];
		}
	 header('Content-type: application/json');
    $respuesta = $callback."(".json_encode($str).")";
echo $respuesta;
?>