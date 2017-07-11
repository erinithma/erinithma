<?php 

	// Include and instantiate the class.
	require_once 'mobiledetect.class.php';
	$detect = new Mobile_Detect;
	 
	// Any mobile device (phones or tablets).
	if ( $detect->isMobile() ) {
		require './mobile/index.html';
	} else {
		require './desktop/index.html';
	}

?>