const YoutubeDL = require("ytdl-core");

let commands = ["Play", "Pause", "Resume", "Skip", "Stop"];

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

exports.run = async (client, msg, args, ops) => {
  if (!msg.member.voice.channel)
    return msg.channel.send("Por favor, conecte-se a um canal de voz");

  if (msg.guild.me.voice.channel)
    return msg.channel.send("Ja setou conectado nesse canal");

  if (!args)
    return msg.channel.send("Por favor, coloque uma URL seguido do comando");

  let validate = await YoutubeDL.validateURL(args);

  if (!validate) return msg.channel.send("URL invalido");

  let info = await YoutubeDL.getInfo(args);

  let connection = await msg.member.voice.channel.join();

  let dispatcher = await connection.play(
    YoutubeDL(args, { filter: "audioonly" })
  );

  msg.channel.send(`Reproduzindo: ${info.title}`);
};
