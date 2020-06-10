<?php
session_start();
include_once("../to/EnviarDatosCorreoResponseTO.php");

$enviarDatosCorreoResponseTO = new EnviarDatosCorreoResponseTO();

$callback  = $_GET["callback"];

$nombre = "";
$correo = "";
// $tema = "";
// $mensaje = "";
$recaptcha = "";
$url="";

//Clave Secreta ReCaptcha
$secret = "6LfXwhsUAAAAAJW6bBR76G_-eeZn402W4K4xNKo7";

try {

    if(isset($_GET)){
        $datos = json_decode($_GET['request']);

        $nombre = $datos ->nombre;
        $correo = $datos->correo;
        $tema = $datos->tema;
        $mensaje = $datos->mensaje;
        $recaptcha = $datos->recaptcha;

        $url = "https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$recaptcha;
        $verify = file_get_contents($url);
        $resulting = json_decode($verify, true);

        if($resulting['success']) {
            $enviarDatosCorreoResponseTO->setError(false);
            $enviarDatosCorreoResponseTO->setMensajeError("");

            // $htmlCorreo = '
            //     <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
            //     <html>
            //     <head>
            //     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            //     <title>Documento sin título</title>
            //     </head>

            //     <body>
            //     <table width="100%" border="0" cellspacing="0" cellpadding="20" style="background-color:#cccccc;font-family:Arial, Helvetica, sans-serif;">
            //         <tr>
            //             <td><table width="800" align="center" border="0" cellspacing="0" cellpadding="10" style="background-color:#ffffff">
            //         <tr>
            //             <td style="background-color:#E99300;color:#ffffff;font-size:25px;font-weight:bold">TDA | Website</td>
            //             <td style="background-color:#E99300;color:#ffffff;font-size:25px;text-align:right;font-weight:bold">Contacto</td>
            //         </tr>
            //         <tr>
            //             <td colspan="2"><table width="800" border="0" cellspacing="0" cellpadding="4" style="font-size:16px;">
            //         <tbody>
            //             <tr>
            //                 <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Nombre: </td>
            //                 <td width="80%">'.$nombre.'</td>
            //             </tr>
            //             <tr>
            //                 <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Correo: </td>
            //                 <td width="80%">'.$correo.'</td>
            //             </tr>
            //             <tr>
            //                 <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Tema: </td>
            //                 <td width="80%">'.$tema.'</td>
            //             </tr>
            //             <tr>
            //                 <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Mensaje: </td>
            //                 <td width="80%">'.$mensaje.'</td>
            //             </tr>
            //         </tbody>
            //     </table>
            //     </body>
            //     </html>
            // ';
            $htmlCorreo = '
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                <html>
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <title>Documento sin título</title>
                </head>

                <body>
                <table width="100%" border="0" cellspacing="0" cellpadding="20" style="background-color:#cccccc;font-family:Arial, Helvetica, sans-serif;">
                    <tr>
                        <td><table width="800" align="center" border="0" cellspacing="0" cellpadding="10" style="background-color:#ffffff">
                    <tr>
                        <td style="background-color:#E99300;color:#ffffff;font-size:25px;font-weight:bold">TDA | Website</td>
                        <td style="background-color:#E99300;color:#ffffff;font-size:25px;text-align:right;font-weight:bold">Contacto</td>
                    </tr>
                    <tr>
                        <td colspan="2"><table width="800" border="0" cellspacing="0" cellpadding="4" style="font-size:16px;">
                    <tbody>
                        <tr>
                            <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Mensaje: </td>
                            <td width="80%">'.$mensaje.'</td>
                        </tr>
                        <tr>
                            <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Nombre: </td>
                            <td width="80%">'.$nombre.'</td>
                        </tr>
                        <tr>
                            <td width="20%" style="text-align:right;background-color:#333333;color:#ffffff;font-weight:bold">Correo: </td>
                            <td width="80%">'.$correo.'</td>
                        </tr>
                    </tbody>
                </table>
                </body>
                </html>
            ';

            $email_from = "contacto@tdaserver.com";
            $from = "contacto@tdaserver.com";
            $email_to = "contacto@tdaserver.com";
            $subject = "contacto@tdaserver.com";

            $separator = md5(time());
            $message = '';

            $eol = PHP_EOL;
            $headers  = "From: \"TDA Website Contacto\"".$from.$eol;
            $headers .= "MIME-Version: 1.0".$eol;
            $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"";
            $body = "--".$separator.$eol;
            $body .= "Content-Type: text/html; charset=\"utf-8\"".$eol;
            $body .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
            $body .= $htmlCorreo.$eol;

            $error_ocurred = mail($email_to, $subject, $body, $headers);

            if(!$error_ocurred){
    //            echo "<center>Ocurrio un problema al enviar su información, intente mas tarde.<br/>";
    //            echo "Si el problema persiste contacte a un administrador.</center>";
            }else{
    //            echo "<center>Su informacion ha sido enviada correctamente a la direccion de email especificada.<br/>(sientase libre de cerrar esta ventana)</center>";
            }
        } else {
            $enviarDatosCorreoResponseTO->setError(true);
            $enviarDatosCorreoResponseTO->setMensajeError("Error Captcha");
        }
    }
}

catch(Exception $error)
{
    $enviarDatosCorreoResponseTO->setError(true);
    $enviarDatosCorreoResponseTO->setMensajeError("La petición no esta disponible. Intentelo más tarde gracias");
}

$respuesta = $callback."(".json_encode((array)$enviarDatosCorreoResponseTO).")";
echo $respuesta;
?>
