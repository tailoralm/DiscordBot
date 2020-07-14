const Discord = require("discord.js");
const bot = new Discord.Client();
const Talking = require("./plugins/talking/talking");
const Player = require("./plugins/player/player");
var AuthDetails = require("./auth.json");
var Config = require("./config.json");

bot.login(AuthDetails.bot_token);

//Iniciar
bot.once("ready", () => {
  console.log("Starting...");
});

bot.on("guildMemberAdd", (membro) => {
  membro.send(Talking.bemVindo());
});

bot.on("message", (msg) => {
  var cmdTxt = msg.content.split(" ")[0].substring(Config.commandPrefix.length);
  var suffix = msg.content.substring(
    cmdTxt.length + Config.commandPrefix.length + 1
  );

  if (verifyIsACommand(msg)) {
    if (verifyIsForPlayer(cmdTxt)) {
      Player.run(bot, msg, suffix, false);
    }

    try {
      msg.reply(Talking.talk(msg.content));
    } catch (err) {
      console.log(err);
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
