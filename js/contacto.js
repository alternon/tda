var ruta = 'api/dispatcher/';

function ValidaFrmContacto() {
    $("#frmContacto").validate({
        submitHandler: enviaCorreoContacto,
        ignore: [],
        rules: {
            nombre: {
                required: true
            },
            correo: {
                required: true,
                email: true
            },
            // tema: {
            //     required: true
            // },
            mensaje: {
                required: true
            }
        },
        messages: {
            nombre: {
                required: 'Escribe tu nombre'
            },
            correo: {
                required: 'Escribe tu correo',
                email: 'Correo inválido'
            },
            // tema: {
            //     required: 'Selecciona una opción'
            // },
            mensaje: {
                required: 'Escribe un mensaje'
            }
        },
        errorPlacement: function(error) {
            $('#btn-contacto').addClass('btn-rojo').html(error).prop('disabled', true);
            setTimeout(function(){
                $('#btn-contacto').removeClass('btn-rojo').html('Enviar').prop('disabled', false);
            }, 5000);
        }
    });
}

function enviaCorreoContacto() {
    var valrecaptcha = $("#g-recaptcha-response").val();
    if(valrecaptcha==="") {
        $('#btn-contacto').addClass('btn-rojo').html('Da clic en Captcha').prop('disabled', true);
        setTimeout(function(){
            $('#btn-contacto').removeClass('btn-rojo').html('Enviar').prop('disabled', false);
        }, 5000);
    } else {
        var datosEnvio = JSON.stringify({
            "nombre": $("#nombre").val(),
            "correo": $("#correo").val(),
            // "tema": $("#tema").val(),
            "mensaje": $("#mensaje").val(),
            "recaptcha": $("#g-recaptcha-response").val()
        });

        urlApi = ruta+"EnviarDatosCorreoDispatcher.php";
    
        $.ajax({
            url:urlApi,
            dataType: "jsonp",
            timeout: 70000,
            async:false,
            data: "request="+datosEnvio,
            error:function(datos){
                console.log(datos.mensaje);
                $('#btn-contacto').addClass('btn-rojo').html('Error, intenta otra vez').prop('disabled', true);
                setTimeout(function(){
                    $('#btn-contacto').removeClass('btn-rojo').html('Enviar').prop('disabled', false);
                }, 5000);
            },
            success:function(datos){
                if (datos.error == false) {
                    $('#btn-contacto').addClass('btn-verde').html('Tu mensaje ha sido enviado').prop('disabled', true);
                    setTimeout(function(){
                        $('#btn-contacto').removeClass('btn-verde').html('Enviar').prop('disabled', false);
                        grecaptcha.reset();
                        $('#frmContacto').reset();
                    }, 5000);
                } else {
                    $('#btn-contacto').addClass('btn-rojo').html('Error, intenta otra vez').prop('disabled', true);
                    setTimeout(function(){
                        $('#btn-contacto').removeClass('btn-rojo').html('Enviar').prop('disabled', false);
                    }, 5000);
                }
            }
        });
    }
}

function valida_captcha() {
    
    var txtcaptcha = $('#captcha').val();

    URL = ruta+"dispatcher/code.php?jsoncallback=?";

	$.ajax({
		url : URL,
		dataType: "jsonp",
		data : "txtcaptcha=" + txtcaptcha,
		async : false,
		success : function(msg) {

			if (msg) {
				EnvioFrmContacto();
			} else {
				alert("error");
			}
		}
	});
	// alert("sirve");
}

$(function () {
    ValidaFrmContacto();
});