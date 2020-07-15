const Play = require("./play");
const Stop = require("./stop");

let commands = ["play", "pause", "resume", "skip", "stop"];
let queue = {};

exports.isPlayerCommand = {
  verify: function (command) {
    for (c of commands) {
      if (command.startsWith(c)) {
        return c;
      }
    }
    return "";
  },
};

exports.run = async (client, msg, cmd, sufix, ops) => {
  if (!msg.member.voice.channel)
    return msg.channel.send("Por favor, conecte-se a um canal de voz");

  if (!sufix)
    return msg.channel.send("Por favor, coloque uma URL seguido do comando");

  if (cmd == "play") {
    Play.run(client, msg, sufix, ops);
  } else if (cmd == "stop") {
    Stop.run(msg);
  }
};
