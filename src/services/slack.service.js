const axios = require('axios');

const sendMessage = async message => {
  if (!message) throw new Error('Message cannot be blank');

  const { SLACK_HOOK } = process.env;

  const payload = {
    text: message,
  };

  await axios.post(SLACK_HOOK, payload);
};

module.exports = { sendMessage };
