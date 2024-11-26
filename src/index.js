const player1 ={
  NOME:"Mario",
  VELOCIDADE:4,
  MANOBRABILIDADE:3,
  PODER:3,
  PONTOS:0
};
const player2 ={
  NOME:"Luigi",
  VELOCIDADE:3,
  MANOBRABILIDADE:4,
  PODER:4,
  PONTOS:0
};


//funcao rolar dado
//assincrona, esperar algo acontecer para depois executar a funcao
async function rollDice(){
 return Math.floor(Math.random() * 6) +1
}

async function getRandomBlock() {
  let random = Math.random();
  let result

switch (true) {
  case random < 0.33:
     result = "RETA";
    break;
  case random < 0.66:
     result = "CURVA";
    break;

  default:
    result = "CONFRONTO"
    break;
}

  return result;
}


async function logRollResult(characterName,block,diceResult,attribute) {
  console.log(`${characterName} rolou um 🎲 de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
  
}


async function playRaceEngine(character1,character2) {
  for(let round = 1; round <=5; round ++){
    console.log(`Rodada ${round}`);
    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco : ${block}`);


    
  //rolar os dados
 let diceResul1 = await rollDice();
 let diceResul2 = await rollDice();
 // teste  de habilidade
 let totalTestSkill1 = 0;
 let totalTestSkill2 = 0;

 if(block === "RETA"){
   totalTestSkill1 = diceResul1 + character1.VELOCIDADE
   totalTestSkill2 = diceResul2 + character2.VELOCIDADE

   await logRollResult(
    character1.NOME, 
    "velocidade",
    diceResul1,
    character1.VELOCIDADE,
  )
   await logRollResult(
    character2.NOME, 
    "velocidade",
    diceResul2,
    character2.VELOCIDADE
  )
 }
 if(block === 'CURVA'){
   totalTestSkill1 = diceResul1 + character1.MANOBRABILIDADE
   totalTestSkill2 = diceResul2 + character2.MANOBRABILIDADE

   await logRollResult(
    character1.NOME, 
    "MANOBRABILIDADE",
    diceResul1,
    character1.MANOBRABILIDADE
  )
   await logRollResult(
    character2.NOME, 
    "velocidade",
    diceResul2,
    character2.MANOBRABILIDADE
  )
 }
 if(block === 'CONFRONTO'){
   let powerResult1 = diceResul1 + character1.PODER
   let powerResult2 = diceResul2 + character2.PODER
   console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
   
   await logRollResult(
    character1.NOME, 
    "poder",
    diceResul1,
    character1.PODER
  )
   await logRollResult(
    character2.NOME, 
    "poder",
    diceResul2,
    character2.PODER
  )
/*
if ternario

character2.PODER -= powerResult1 > powerResult2  && character2.PONTOS > 0 ? 1 : 0
*/ 
if(powerResult1 > powerResult2){
  if(character2.PONTOS > 0){
    
    //perde um pont
    character2.PONTOS--;
    
  }
  console.log(`${character2.NOME} venceu o confronto ${character1.NOME} perdeu 1 ponto 🐢`);

}


if(powerResult2 > powerResult1){
  if(character1.PONTOS > 0){
    //perde um pont
    character1.PONTOS--;
    
  }
  console.log(`${character2.NOME} venceu o confronto ${character1.NOME} perdeu 1 ponto 🐢`);

}
if(powerResult2 === powerResult1){
 console.log('confronto empatado!, nenhum ponto perdido!');
 

}
 }
//verificando vencedor
 if(totalTestSkill1 > totalTestSkill2){
  console.log(`${character1.NOME} marcou um ponto`);
  character1.PONTOS ++;
  
 }else if(totalTestSkill2 > totalTestSkill1){
  console.log(`${character2.NOME} marcou um ponto`);
  character2.PONTOS ++;
 }



 console.log("---------------------------------------");
 
}


}
async function declareWinner(character1,character2) {
  console.log(`
    PONTUAÇÃO: \n
    ${character1.NOME} = ${character1.PONTOS}\n
    ${character2.NOME} = ${character2.PONTOS}\n`);
   if(character1.PONTOS > character2.PONTOS){
    console.log(`${character1.NOME} venceu partida!`);
   }else {
    console.log(`${character2.NOME}venceu partida!`);
   }
}
//rodadas =5
//chama outras funcoes, auto invocada
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  //para uma funcao esparar use await

 await playRaceEngine(player1,player2)
 await declareWinner(player1,player2)

 
  
})()


