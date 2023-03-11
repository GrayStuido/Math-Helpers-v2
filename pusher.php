<?php
require __DIR__ . '/vendor/autoload.php';

use Pusher\Pusher;

$app_id = 'YOUR_APP_ID';
$app_key = 'YOUR_APP_KEY';
$app_secret = 'YOUR_APP_SECRET';
$app_cluster = 'YOUR_CLUSTER';

$pusher = new Pusher($app_key, $app_secret, $app_id, [
  'cluster' => $app_cluster,
]);

$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];

$pusher->trigger('notifications', 'new-notification', [
  'message' => $message,
]);
?>
