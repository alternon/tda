<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '0');
	session_start();
	//$rando=$_GET['rando'];
    $str='';
    $chars = "abcdefghijklmnpqrstuvwxyz123456789";
    $size = strlen($chars);
    for ($i = 0; $i < 6; $i++) {
        $str .= $chars[rand(0, $size - 1)];
    }
    $rando = $str;
	$_SESSION['captcha_code'] =$rando;

		//create captcha string
	// Create a 100*30 image
	$im = imagecreate(163, 39);
	/*$im = imagecreate(163,39);
    $fondo=imagecolorallocate ($im, 255, 255, 255);
	$rojo=imagecolorallocate ($im, 255, 0, 0);*/
	// White background and blue text
	$white = imagecolorallocate($im, 255, 255, 255);
	$grey = imagecolorallocate($im, 128, 128, 128);
	$black = imagecolorallocate($im, 0, 0, 0);
	$red = imagecolorallocate($im, 81, 24, 25);


	// Write the string at the top left
	imagestring($im, 7, 55, 12, $rando, $red);
	//imagettftext($im, 22, 0, 30, 30, $rojo,"arial.ttf", $rando);


	// prevent client side  caching
	header("Expires: Wed, 1 Jan 1997 00:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	// Output the image
	header('Content-type: image/png');

	imagepng($im);
	imagedestroy($im);

?>



