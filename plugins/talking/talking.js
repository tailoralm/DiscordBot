exports.bemVindo = function () {
  return "Seja bem vindo seu arrombado!";
};

exports.talk = function (msg) {
  return answers[msg].answer;
};

exports.commands = ["!oi", "!como voce ta?"];

answers = {
  "!oi": {
    answer: "Olá pra você também, seu corno!",
  },
  "!como voce ta?": {
    answer: "Não tão bem como você, mas gostaria",
  },
};
