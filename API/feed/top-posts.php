<?php
$configPath = '../../files/config.json';
$config = json_decode(file_get_contents($configPath));

require_once '../../assets/user.php';
require_once '../../assets/token.php';
require_once '../../assets/post.php';

$sql = "select p.uuid, p.title, p.description, p.extention, p.UserID, u.username, u.uuid, u.profilePic, count(pl.UserID) as likes
from post p
    inner join postliked pl on p.PostID = pl.PostID
    inner join user u on p.UserID = u.UserID
where p.isDeleted = 0 and u.deleted = 0
group by p.uuid, p.title, p.description, p.extention, p.UserID, u.username, u.uuid, u.profilePic
order by likes desc
limit ? offset ?";

//check request:

if(!isset($_POST['offset'])) {
    $resp = new stdClass();
    $resp->error = "Invalid Request";
    exit(json_encode($resp));
}

$offset = $_POST['offset'];
$limit = $config->respLength;

if(!is_numeric($offset)) {
    $resp = new stdClass();
    $resp->error = "Offset has to be numeric";
    exit(json_encode($resp));
}

//check login:
if (!isset($_COOKIE[$config->token->name])) {
    $resp = new stdClass();
    $resp->error = "No Permission";
    exit(json_encode($resp));
}
$token = $_COOKIE[$config->token->name];

//db connection:
$db = new mysqli($config->database->host, $config->database->username, $config->database->password, $config->database->database);

if($db->connect_error) {
    $resp = new stdClass();
    $resp->error = "Internal Server Error (004)";
    exit(json_encode($resp));
}

$userId = checkTokenWRedirect($token, $config, $db);

$pstmt = $db->prepare($sql);

if($pstmt === false) {
    $resp = new stdClass();
    $resp->error = "Internal Server Error (E002)";
    $db->close();
    exit(json_encode($resp));
}

$pstmt->bind_param("ii", $limit, $offset);

if(!$pstmt->execute()) {
    $resp = new stdClass();
    $resp->error = "Internal Server Error (E002)";
    $db->close();
    exit(json_encode($resp));
}

$res = $pstmt->get_result();
$result = $res->fetch_all();

$resp = array();

foreach ($result as $item) {
    $respItem = new stdClass();
    $respItem->post = new stdClass();
    $respItem->user = new stdClass();
    $respItem->post->id = $item[0];
    $respItem->post->title = $item[1];
    $respItem->post->desc = $item[2];
    $respItem->post->url = $item[0] . "." . $item[3];
    $respItem->post->likes = $item[8];
    $respItem->user->name = $item[5];
    $respItem->user->id = $item[6];
    $respItem->user->img = $item[7];

    $resp[] = $respItem;
}

echo json_encode($resp);

$res->close();
$pstmt->close();
$db->close();
?>