const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const secret = 'your_webhook_secret_here'; // Replace with your webhook secret
  if (event.httpMethod === 'POST' && event.path === '/webhook') {
    let body = event.body;
    let headers = event.headers;
    let signature = headers['x-hub-signature'];
    let event_type = headers['x-github-event'];
    // Verify webhook signature
    let hmac = crypto.createHmac('sha1', secret);
    hmac.update(body);
    let calculated_signature = 'sha1=' + hmac.digest('hex');
    if (signature !== calculated_signature) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      };
    }
    // Parse payload and trigger message box
    let payload = JSON.parse(body);
    if (event_type === 'ping') {
      return {
        statusCode: 200,
        body: 'pong'
      };
    } else if (event_type === 'push') {
      let message = 'A new commit was pushed to the repository';
      triggerMessageBox(message);
    }
    // Respond with success status
    return {
      statusCode: 200,
      body: 'OK'
    };
  } else {
    return {
      statusCode: 404,
      body: 'Not Found'
    };
  }
};

async function triggerMessageBox(message) {
  // Replace YOUR_MESSAGEBOX_ENDPOINT with the URL of your message box endpoint
  var messageboxUrl = 'YOUR_MESSAGEBOX_ENDPOINT';
  fetch(messageboxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'webhook-received',
      message: message
    })
  })
  .then(function(response) {
    if (!response.ok) {
      console.error('Failed to trigger message box');
    }
  })
  .catch(function(error) {
    console.error('Error triggering message box: ' + error.message);
  });
}
