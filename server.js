const Discord = require("discord.js");
const bot = new Discord.Client();
const Talking = require("./plugins/talking/talking");
const Player = require("./plugins/player/player");

const active = new Map();

var AuthDetails = require("./auth.json");
var Config = require("./config.json");

bot.login(AuthDetails.bot_token);

//Iniciar
bot.once("ready", () => {
  console.log("Started");
});

bot.on("guildMemberAdd", (membro) => {
  membro.send(Talking.bemVindo());
});

bot.on("message", (msg) => {
  var suffix = msg.content.slice(Config.commandPrefix.length).trim().split(" ");
  var cmdTxt = suffix.shift().toLowerCase();

  if (verifyIsACommand(msg)) {
    if (verifyIsForPlayer(cmdTxt)) {
      let ops = {
        ownerID: msg.author.id,
        active: active,
      };
      Player.run(bot, msg, cmdTxt, suffix, ops);
    } else {
      if (verifyIsToTalk(cmdTxt)) {
        msg.reply(Talking.talk(cmdTxt));
      }
    }
  }
});

function verifyIsACommand(msg) {
  if (
    msg.author.id != bot.user.id &&
    msg.content.startsWith(Config.commandPrefix)
  ) {
    return true;
  }
  return false;
}

function verifyIsForPlayer(msg) {
  return Player.isPlayerCommand.verify(msg);
}

function verifyIsToTalk(msg) {
  return Talking.isTalkCommand.verify(msg);
}
