<?php
  if($_SERVER['REQUEST_METHOD'] === 'POST') {
   if(validateInput($_POST)) {
       $error_message = 'Something was written wrong..';
    } else {
      require $_SERVER['DOCUMENT_ROOT'].'/lib/PHPMailer/PHPMailerAutoload.php';
      $phpmail = new PHPMailer;
      
      $subject = 'Тема письма';
      $msg = '<p>Текст письма</p>';

      //$mail->SMTPDebug = 3;                               // Enable verbose debug output
      $phpmail->setLanguage('ru');
      $phpmail->CharSet = 'UTF-8';
      $phpmail->isSMTP();                                      // Set mailer to use SMTP
      $phpmail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
      $phpmail->SMTPAuth = true;                               // Enable SMTP authentication
      $phpmail->Username = 'info@smartdevelopers.ru';                 // SMTP username
      $phpmail->Password = 'XsqwWoP23';                           // SMTP password
      $phpmail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
      $phpmail->Port = 465;                                    // TCP port to connect to
      $phpmail->setFrom('info@acmespb.ru', 'ОБратная связь');
      $phpmail->isHTML(true);                                  // Set email format to HTML
      $phpmail->Subject = $subject;
      $phpmail->Body    = $msg;
      
      $phpmail->addAddress($To_apt);     // Add a recipient
      $phpmail->send();
    }
  }

  function validateInput($post = array()) {

  }


    
?>