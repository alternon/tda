<?php
class EnviarDatosCorreoResponseTO
{
	var $error = false;
	var $mensajeError = "";
	
	public function setError($error){
		$this->error = $error;
	}
	public function setMensajeError($mensajeError){
		$this->mensajeError = $mensajeError; 
	}
	
	
	public function getError(){
		return $this->error;
	}
	public function getMensajeError(){
		return $this->mensajeError;
	}

}
?>