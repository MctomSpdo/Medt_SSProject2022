<?php

require_once('./assets/token.php');

$configPath = 'files/config.json';
$config = json_decode(file_get_contents($configPath));

//if there is no cookie, redirect to login:
if (!isset($_COOKIE[$config->token->name])) {
    header("Location: ./login.php");
    exit();
}

//delete cookie:
unset($_COOKIE[$config->token->name]);
deleteTokenCookies($config);

//redirect to login page:
header("Location: ./login.php");

include "assets/error.php";