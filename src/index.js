const player1 = {
  Nome: "Mario",
  Velocidade: 4,
  Manobralidade: 3,
  Poder: 3,
  Pontos: 0,
};

const player2 = {
  Nome: "Luigi",
  Velocidade: 3,
  Manobralidade: 4,
  Poder: 4,
  Pontos: 0,
};

async function RollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confronto";
      break;
  }
  return result;
}
async function logRollResult(characterNome, block, diceResult, atribute) {
  console.log(
    `${characterNome} bloco da pista ${block} valor do dado foi ${diceResult} e total de ${atribute} = ${
      atribute + diceResult
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 6; round++) {
    console.log(`Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco ${block}`);
    let diceRseult1 = await RollDice();
    let diceRseult2 = await RollDice();

    let totalSkill1 = 0;
    let totalSkill2 = 0;

    if (block === "Reta") {
      totalSkill1 = character1.Velocidade + diceRseult1;
      totalSkill2 = character2.Velocidade + diceRseult2;
      await logRollResult(
        character1.Nome,
        "Velocidade",
        diceRseult1,
        character1.Velocidade
      );
      await logRollResult(
        character2.Nome,
        "Velocidade",
        diceRseult2,
        character2.Velocidade
      );
    }

    if (block === "Curva") {
      totalSkill1 = character1.Manobralidade + diceRseult1;
      totalSkill2 = character2.Manobralidade + diceRseult2;

      await logRollResult(
        character1.Nome,
        "Manobralidade",
        diceRseult1,
        character1.Manobralidade
      );
      await logRollResult(
        character2.Nome,
        "Manobralidade",
        diceRseult2,
        character2.Manobralidade
      );
    }
    if (block === "Confronto") {
      let power1 = character1.Poder + diceRseult1;
      let power2 = character2.Poder + diceRseult2;

      console.log(`${character1.Nome} confronotou ${character2.Nome}`);
       await logRollResult(
        character1.Nome,
        "Poder",
        diceRseult1,
        character1.Poder
      );
      await logRollResult(
        character2.Nome,
        "Poder",
        diceRseult2,
        character2.Poder
      );

      if(power1>power2){
        if(character2.Poder>0){
          character2.Poder -=1;
        }
      }
      if(power1<power2){
        if(character1.Poder>0){
          character1.Poder -=1;
        }
      }
       if(power1===power2){
        console.log("Empate no confronto, ninguem perde poder");
      }
      
     
    }
    if (totalSkill1 > totalSkill2) {
      console.log(`🏆 ${character1.Nome} marcou 1 ponto!`);
      character1.Pontos += 1;
    } else if (totalSkill2 > totalSkill1) {
      console.log(`🏆 ${character2.Nome} marcou 1 ponto!`);
      character2.Pontos += 1;
    }
  }

  console.log(
    `🏆 Placar final: \n ${character1.Nome} ${character1.Pontos} X ${character2.Pontos} ${character2.Nome}`
  );
}


(async function main() {
  console.log(
    `🏁 Corrida iniciada! 🏁\n 
    ${player1.Nome} X ${player2.Nome}\n
    `
  );
  await playRaceEngine(player1, player2);
})();
