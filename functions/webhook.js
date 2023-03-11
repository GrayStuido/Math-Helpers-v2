exports.handler = function(event, context, callback) {
  // Verify webhook secret
  if (event.headers['x-webhook-secret'] !== process.env.WEBHOOK_SECRET) {
    return callback(null, {
      statusCode: 401,
      body: 'Unauthorized'
    });
  }
  // Parse payload and trigger message box
  let payload = JSON.parse(event.body);
  if (payload.event === 'button-clicked') {
    triggerMessageBox(payload.message);
  }
  // Respond with success status
  callback(null, {
    statusCode: 200,
    body: 'OK'
  });
};

function triggerMessageBox(message) {
  // Replace with code to trigger message box on your website
  alert(message);
}