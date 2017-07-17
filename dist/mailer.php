<?php
  
  $json = array();
  $json['status']=false;

  if($_SERVER['REQUEST_METHOD'] === 'POST') {
   if(!validateInput($_POST)) {
       $json['error'] = 'Некорректно заполненные поля';

    } else {
      require $_SERVER['DOCUMENT_ROOT'].'/libs/phpmailer/PHPMailerAutoload.php';

      $phpmail = new PHPMailer;
      
      $message = formMessage($_POST);

      //$phpmail->SMTPDebug = 3;                               // Enable verbose debug output
      $phpmail->setLanguage('ru');
      $phpmail->CharSet = 'UTF-8';
      $phpmail->isSMTP();                                      // Set mailer to use SMTP
      $phpmail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
      $phpmail->SMTPAuth = true;                               // Enable SMTP authentication
      $phpmail->Username = 'info@smartdevelopers.ru';                 // SMTP username
      $phpmail->Password = 'XsqwWoP23';                           // SMTP password
      $phpmail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
      $phpmail->Port = 465;                                    // TCP port to connect to
      $phpmail->setFrom('info@smartdevelopers.ru', 'Обратная связь');
      $phpmail->isHTML(true);                                  // Set email format to HTML
      $phpmail->Subject = $message['subject'];
      $phpmail->Body    = $message['text'];
      
      $phpmail->addAddress("nikita.kruchinkin@gmail.com");     // Add a recipient
      $phpmail->send();

      notify();

      $json['status']=true;
      $json['success'] = '<p class="popup__title">Спасибо за обращение! Мы ответим в течение часа.</p>';
    }
  }

  header('Content-type: application/json');
  echo json_encode($json);
  exit();



  function validateInput($data = array()) {
    $result = true;
    // anti-spam
    if (isset($data['e-mail']) && $data['e-mail']) return false;
    
    switch($data['action']) {
      case 'order':
        if (isset($data['name']) && !$data['name']) $result=false;
        if (isset($data['phone']) && !$data['phone']) $result=false;
      break;
      case 'callback':
        if (isset($data['contacts']) && !$data['contacts']) $result=false;
      break;
    }
    return $result;
  }

  function formMessage($data = array()) {
    $message = array();

    switch($data['action']) {
      case 'order':
        $message['subject'] = "Заявка на разработку"; 
        
        $text = file_get_contents(__DIR__.'/libs/templates/order.html', FILE_USE_INCLUDE_PATH);
        $text = str_replace('%%subject%%', "Заявка на разработку", $text); 
        
        $contacts = "<p>";
        if (isset($data['name'])) $contacts.="<b>Имя: </b>".$data['name'].", ";
        if (isset($data['phone'])) $contacts.="<b>Телефон: </b>".$data['phone'].", ";
        if (isset($data['website']) && $data['website']) $contacts.="<b>Сайт: </b>".$data['website'].", ";
        if (isset($data['email']) && $data['email']) $contacts.="<b>E-mail: </b>".$data['email'].", ";
        $contacts.= "</p>";

        $project = '';

        if (isset($data['landing']) || isset($data['store']) || isset($data['corp'])) {
          if (isset($data['landing'])) $project.="<li>Landing-page</li>";
          if (isset($data['store'])) $project.="<li>Интернет-магазин</li>";
          if (isset($data['corp'])) $project.="<li>Корпоративный сайт</li>";  
        } else {
          $project.="<li>Не указан</li>";
        }

        $text = str_replace('%%contacts%%', $contacts, $text); 
        $text = str_replace('%%project%%', $project, $text); 
        
        $message['text'] = $text;
      break;
      
      case 'callback':
        $message['subject'] = "Заявка на обратный звонок"; 
        
        $text = file_get_contents(__DIR__.'/libs/templates/callback.html', FILE_USE_INCLUDE_PATH);
        $text = str_replace('%%subject%%', "Заявка на обратный звонок", $text); 
        
        $contacts = "<p>";
        if (isset($data['contacts'])) $contacts.="<b>Для связи: </b>".$data['contacts'].", ";
        $contacts.= "</p>";

        $text = str_replace('%%contacts%%', $contacts, $text); 
        $message['text'] = $text;
      break;
    }

    return $message;

  }

  function notify() {
    $token = 'token';
    $channel = 'channel';
    $text = urlencode('Проверь почту, там новое сообщение!');
    //$response = @file_get_contents("https://slack.com/api/chat.postMessage?token=$token&channel=$channel&text=$text");
    //var_dump($response);
  }