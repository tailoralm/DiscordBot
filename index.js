const Discord = require("discord.js");
const bot = new Discord.Client();
const Talking = require("./plugins/talking/talking");
var AuthDetails = require("./auth.json");
var Config = require("./config.json");

bot.login(AuthDetails.bot_token);

//Iniciar
bot.once("ready", () => {
  //const channel = bot.channels.get("geral");
  //channel.sendMessage("Hello world");
  console.log("yaya");
});

bot.on("guildMemberAdd", (membro) => {
  membro.send(Talking.bemVindo());
});

bot.on("message", (msg) => {
  if (verifyIsACommand(msg)) {
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
