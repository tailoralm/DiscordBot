exports.run = (msg) => {
  if (msg.member.voice.channelID !== msg.guild.me.voice.channelID)
    return msg.channel.send("Você não está no mesmo canal de voz que eu!");

  msg.guild.me.voice.channel.leave();

  msg.channel.send("Saindo do canal...");
};
