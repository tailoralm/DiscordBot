const YoutubeDL = require("ytdl-core");

exports.run = async (client, msg, args, ops) => {
  let info = await YoutubeDL.getInfo(args[0]);

  let data = ops.active.get(msg.guild.id) || {};

  if (!data.connection) data.connection = await msg.member.voice.channel.join();
  if (!data.queue) data.queue = [];
  data.guildID = msg.guild.id;

  data.queue.push({
    songTitle: info.videoDetails.title,
    requester: msg.author.tag,
    url: args[0],
    announceChannel: msg.channel.id,
  });

  if (!data.dispatcher) play(client, ops, data);
  else {
    msg.channel.send(
      `Adicionado a fila: ${info.videoDetails.title} | Por: ${msg.author.id}`
    );
  }

  ops.active.set(msg.guild.od, data);
};

async function play(client, ops, data) {
  client.channels.cache
    .get(data.queue[0].announceChannel)
    .send(
      `Reproduzindo: ${data.queue[0].songTitle} | Por : ${data.queue[0].requester}`
    );

  data.dispatcher = await data.connection.play(
    YoutubeDL(data.queue[0].url, { filter: "audioonly" })
  );

  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once("finish", function () {
    finish(client, ops, this);
  });
}

function finish(client, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if (fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);

    play(client, ops.fetched);
  } else {
    ops.active.delete(dispatcher.guildID);

    let vc = client.guilds.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}
