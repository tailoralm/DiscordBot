let commands = ["oi", "como-voce-ta?", "falatu"];

exports.isTalkCommand = {
  verify: function (command) {
    for (c of commands) {
      if (command.startsWith(c)) {
        return c;
      }
    }
    return "";
  },
};

exports.bemVindo = function () {
  return "Seja bem vindo seu arrombado!";
};

exports.talk = function (msg) {
  return answers[msg].answer;
};

answers = {
  oi: {
    answer: "Olá pra você também, seu corno!",
  },
  "como-voce-ta?": {
    answer: "Não tão bem como você, mas gostaria",
  },
  falatu: {
    answer: "Não enche ô arrombado!",
  },
};
