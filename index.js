const Telegraf = require('telegraf').default;

const nap_socket = require('socket.io-client')(process.env.NAP_HOST);

const bot = new Telegraf(process.env.BOT_TOKEN);

let event = (process.env.GET_ALL_SITE_COMMENTS === "1" ? "site:" : "") + process.env.KEY + "_" + process.env.LAYER;

nap_socket.on(new Buffer(event).toString("base64"), (data) => {
  switch (data._method) {
    case 0: {
      const text = `<b>${data.nickname || "Unknown"}</b>\n${data.text} <a href="https://whatsonchain.com/tx/${data._txid}">🔗</a>\n\n${data.key}`;
      bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML", disable_web_page_preview: true }).catch(err => {
        console.log(err);
      })
    }; break;
    case 1: {
      const text = `<b>${data.nickname || "Unknown"}</b>↩️ replied on the <a href="https://whatsonchain.com/tx/${data.key}">comment</a>\n${data.text} <a href="https://whatsonchain.com/tx/${data._txid}">🔗</a>`;
      bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML", disable_web_page_preview: true }).catch(err => {
        console.log(err);
      })
    }; break;
    case 2: {
      const text = `<b>${data.nickname || "Unknown"}</b>👏 clapped for the <a href="https://whatsonchain.com/tx/${data.key}">comment</a> <a href="https://whatsonchain.com/tx/${data._txid}">🔗</a>`;
      bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML", disable_web_page_preview: true }).catch(err => {
        console.log(err);
      })
    }; break;
    case 3: {
      const text = `<b>${data.nickname || "Unknown"}</b>👎 boo for the <a href="https://whatsonchain.com/tx/${data.key}">comment</a> <a href="https://whatsonchain.com/tx/${data._txid}">🔗</a>`;
      bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML", disable_web_page_preview: true }).catch(err => {
        console.log(err);
      })
    }; break;
    case 4: {
      const text = `<b>${data.nickname || "Unknown"}</b>⚠️ report on the <a href="https://whatsonchain.com/tx/${data.key}">comment</a>\n${data.text} <a href="https://whatsonchain.com/tx/${data._txid}">🔗</a>`;
      bot.telegram.sendMessage(process.env.CHANNEL_NAME, text, { parse_mode: "HTML", disable_web_page_preview: true }).catch(err => {
        console.log(err);
      })
    }; break;
  }
})