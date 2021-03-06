<?php

require_once('../../assets/token.php');

$configPath = '../../files/config.json';
$config = json_decode(file_get_contents($configPath));

//unset variable:
if (isset($_COOKIE[$config->token->name])) {
    unset($_COOKIE[$config->token->name]);
}

//delete cookie:
deleteTokenCookies($config);

//response
$resp = new stdClass();
$resp->result = true;
echo json_encode($resp);