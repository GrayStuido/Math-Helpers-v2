<?php
require __DIR__ . '/vendor/autoload.php';

use Pusher\Pusher;

$app_id = '1566853';
$app_key = '7dbedc6f3a6734be2d71';
$app_secret = '4dc2d8a52e74669b1e41';
$app_cluster = 'us3';

$pusher = new Pusher($app_key, $app_secret, $app_id, [
  'cluster' => $app_cluster,
]);

$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];

$pusher->trigger('notifications', 'new-notification', [
  'message' => $message,
]);
?>
