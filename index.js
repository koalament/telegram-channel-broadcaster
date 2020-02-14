const Telegraf = require('telegraf').default;

const nap_socket = require('socket.io-client')(process.env.NAP_HOST);

const bot = new Telegraf(process.env.BOT_TOKEN);

let event = (process.env.GET_ALL_SITE_COMMENTS === "1" ? "site:" : "") + process.env.KEY + "_" + process.env.LAYER;

nap_socket.on(new Buffer(event).toString("base64"), (comment) => {
  const text = `${comment.text} <a href="https://whatsonchain.com/tx/${comment._txid}">🔗</a>\n\n${comment.key}`;
  bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML" }).catch(err => {
    console.log(err);
  })
})