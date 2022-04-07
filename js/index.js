class Player {
    
    constructor(icon){
        this.player = 1;
        this.action = 0;
        this.health = 10;
        this.score = 0;
        this.icon = icon;
    }

    attack(attack){
        this.action = attack;
    }

    battle(){
        let huMove = this.action; // 0-2
        this.aiMove = this.enemyAttack(); //0-2
        // 0 = rock 1 = paper 2 = scissors
        // console.log(`User chose ${actions[huMove]}...`);
        // console.log(`AI chose ${actions[this.aiMove]}...`);
        if( ((huMove + 1) % 3) === this.aiMove  ){
            this.health--;
            // console.log('AI Wins!');
            return -1;                
        }else if(huMove === this.aiMove ){
            // console.log('Tie!');
            return 0;                
        }else{
            // console.log('Player Wins!');
            return 1;                
        }
    }
    enemyAttack(){
        return Math.floor(Math.random() * 3);
    }
    gameWon(){
        this.score+=10;
    }
}

window.onload = () => {
document.getElementById('start-button').onclick = () => {
    if(frame===2){
        drawSecondFrame();
        frame = 3;
        return true;
    }else{
    begin();
    toggleDOM('loading','none');
    toggleDOM('health','unset');
    toggleDOM('score','unset');
    displayHP(human.health);
    toggleDOM('points','unset',0);
    displayScore(human.score);
    }        
};
document.getElementById('fwd-button').onclick = () => {
    displayScore();
};    
document.getElementById('back-button').onclick = () => {
    toggleDOM('health','none');
    displayHP();
};
document.querySelector('#canvas').addEventListener("mousedown", function(e)
{
    getMousePosition(myCanvas, e);
});    
let toggle = 0;
document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if(key === "ArrowRight"){
        console.log(toggle);
        let body = document.querySelector('body');
        if(toggle === 1){
            body.style.background = "url('./img/bg-sb2.svg')";                
            body.style.backgroundRepeat = "norepeat";
            body.style.backgroundSize = "100%";                
        }else if(toggle === 2){
            body.style.background = "url('./img/bg3.svg')";                
            body.style.backgroundRepeat = "norepeat";
            body.style.backgroundSize = "100%";                
        }else if(toggle === 3){
            body.style.background = "url('./img/bg-spiral.svg')";                
            body.style.backgroundRepeat = "norepeat";
            body.style.backgroundSize = "100%";                
        }else if(toggle === 4){
            body.style.background = "url('./img/background.svg')";
            body.style.backgroundRepeat = "repeat";
            body.style.backgroundSize = "20%";
        }else{
            body.style.background = "unset";                
            body.style.backgroundColor = "black";                    
        }
        toggle++;            
    }
});

assetPreloader();
};

/*
Constants
*/

let frame = 0;

let countdown = '';

const actions = ['rock','paper','scissors','shoot'];
const human = new Player('panda');

const myCanvas = document.querySelector('#canvas');
const ctx = myCanvas.getContext('2d');

const playerIcons = [
'https://twemoji.maxcdn.com/v/latest/svg/1f99d.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f42f.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f435.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f43c.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f43a.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f423.svg',
];

const players = ['chick','tiger','monkey','panda','racoon','wolf'];

const gameAssets = { 
rock:      { src:'https://twemoji.maxcdn.com/v/latest/svg/1faa8.svg', loaded:false}, 
paper:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f4c3.svg',  loaded:false}, 
scissors:  { src:'https://twemoji.maxcdn.com/v/latest/svg/2702.svg',   loaded:false}, 
lHand:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f91c.svg',  loaded:false},
rHand:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f91b.svg',  loaded:false},
background:{ src:'./img/background.svg',  loaded:false},
spiralbg:  { src:'./img/bg-spiral.svg', loaded: false},
swords:    { src:'https://twemoji.maxcdn.com/v/latest/svg/2694.svg',  loaded:false},
bubble:    { src:'https://twemoji.maxcdn.com/v/latest/svg/1f5e8.svg', loaded:false},
bubbleleft:{ src:'./img/bubble-left.svg', loaded:false},    
swirl:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f365.svg', loaded:false},
chick:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f423.svg', loaded:false},
tiger:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f42f.svg', loaded:false},
monkey:    { src:'https://twemoji.maxcdn.com/v/latest/svg/1f435.svg', loaded:false},
panda:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f43c.svg', loaded:false},
racoon:    { src:'https://twemoji.maxcdn.com/v/latest/svg/1f99d.svg', loaded:false},
wolf:      { src:'https://twemoji.maxcdn.com/v/latest/svg/1f43a.svg', loaded:false},
rockH:     { src:'https://twemoji.maxcdn.com/v/latest/svg/270a.svg', loaded:false},
paperH:    { src:'https://twemoji.maxcdn.com/v/latest/svg/1f91a.svg', loaded:false},
scissorsH: { src:'https://twemoji.maxcdn.com/v/latest/svg/270c.svg', loaded:false},
happy:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1f973.svg', loaded: false},
sad:       { src:'https://twemoji.maxcdn.com/v/latest/svg/1f614.svg', loaded: false},
heartH:     { src:'https://twemoji.maxcdn.com/v/latest/svg/1faf6.svg', loaded: false},
};

const hpCounter = [
'https://twemoji.maxcdn.com/v/latest/svg/30-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/31-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/32-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/33-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/34-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/35-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/36-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/37-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/38-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/39-20e3.svg',
'https://twemoji.maxcdn.com/v/latest/svg/1f51f.svg'];

function getMousePosition(canvas, event) {
let rect = canvas.getBoundingClientRect();
let x = event.clientX - rect.left;
let y = event.clientY - rect.top;
clickEvents(x,y);
console.log("Coordinate x: " + x, 
            "Coordinate y: " + y);
}

// thing = DOM element by id
// toggle = 'none' or 'unset'
// value = text/element to display
function toggleDOM(thing,toggle,value){
document.getElementById(thing).style.display = toggle;
if (value !== undefined){
    document.getElementById(thing).innerHTML = value;
}
}

function displayHP(hp){
healthImage = document.getElementById('hp-img');
if(hp !== undefined){
    healthImage.src = hpCounter[hp];
}
}

function displayScore(score){
document.getElementById('score').style.display = 'unset';
if(score !== undefined){
    document.getElementById('points').textContent = score;
}
}

function toggleLoading(){
document.getElementById('loading').style.display = 'none';
}

function updateCenterText(text){
document.getElementById('center-screen').textContent = text;
}


function assetPreloader(){
for (const asset in gameAssets) {
    gameAssets[asset].image = new Image();
    gameAssets[asset].image.src = gameAssets[asset].src;
    gameAssets[asset].image.onload = function() {
        gameAssets[asset].loaded = true;
        // console.log(`${asset} loaded`);
    }
}

document.querySelector('.buttons').style.display = 'unset';
updateCenterText('Press Start to play');
document.getElementById('loading').src = "./img/wait.svg";
}

function clickEvents(x,y){
let choice = -1;

if(y > 200 && y < 340){
    console.log('Top Row');
    choice = 3;
}
if(y > 350 && y < 450){
    if(x > 50 && x < 150){
        //icon 1
        choice = 0;
        console.log('rock');
    }else if( x > 200 && x < 300){
        //icon 2
        choice = 1;
        console.log('paper');
    }else if ( x > 350 && x < 450){
        //icon 3
        choice = 2;
        console.log('scissors');
    }
}
console.log(choice);
makeChoice(choice);
}

function makeChoice(opt){
if(opt < 0 ) { return -1; }
console.log(`Frame # ${frame}`);
if(frame === 1 && opt < 3){
    human.attack(opt);
    // drawFirstFrame();
    countdown = setInterval(animateRPS,1000);        
    frame = 2;
    return true;
}else if(frame === 2){
    drawSecondFrame();
    frame = 3;
    return true;
}else if(frame === 3){
    begin();
}
}

function begin(){
ctx.clearRect(0,0,500,500);
const ptrn = ctx.createPattern(gameAssets['background'].image, 'repeat');
ctx.fillStyle = ptrn;
// ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);   
ctx.drawImage(gameAssets['rock'].image,50,350,100,100); 
ctx.drawImage(gameAssets['paper'].image,200,350,100,100);
ctx.drawImage(gameAssets['scissors'].image,350,350,100,100);
updateCenterText('Pick your move: ');
document.getElementById('start-button').innerText = 'Start';     
frame = 1;
}


function drawFirstFrame(){
let option = human.action;
console.log(option);
ctx.clearRect(0,0,500,500);

const ptrn = ctx.createPattern(gameAssets['background'].image, 'repeat');
ctx.fillStyle = ptrn;
// ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);    

ctx.drawImage(gameAssets[actions[option]].image,200,350,100,100);
// ctx.drawImage(gameAssets[actions[option]+"H"].image,350,350,100,100);
ctx.drawImage(gameAssets[human.icon].image,50,350,100,100); 
ctx.drawImage(gameAssets['tiger'].image,350,350,100,100);    


updateCenterText(`Shoot!`);
// ctx.drawImage(gameAssets['swirl'].image,155,155,200,200);        
ctx.drawImage(gameAssets['bubbleleft'].image,50,150,200,200);
ctx.drawImage(gameAssets['bubble'].image,255,150,200,200);        
ctx.drawImage(gameAssets['lHand'].image,100,200,100,100);
ctx.drawImage(gameAssets['swords'].image,200,185,100,100);    
ctx.drawImage(gameAssets['rHand'].image,300,200,100,100);
document.getElementById('start-button').innerText = 'Shoot';
}

function gameOver(){
    ctx.clearRect(0,0,500,500);
    updateCenterText('Game Over');
    ctx.drawImage(gameAssets['sad'].image,200,200,100,100);    
}

function drawSecondFrame(){
ctx.clearRect(0,0,500,500);

const ptrn = ctx.createPattern(gameAssets['background'].image, 'repeat');
ctx.fillStyle = ptrn;
// ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);   

let result = human.battle();
let playerMove = human.action;
let oppoMove = human.aiMove;

if(result === -1 ){
    updateCenterText(`Opponent won`);
    displayHP(human.health);
}else if(result === 0){
    updateCenterText(`Tie`);

}else if(result === 1){
    updateCenterText(`You won!`);
    human.gameWon();
    displayScore(human.score);
}

ctx.drawImage(gameAssets[actions[oppoMove]].image,200,200,100,100);
ctx.drawImage(gameAssets[actions[oppoMove]+"H"].image,50,200,100,100);
ctx.drawImage(gameAssets['tiger'].image,350,200,100,100);    

ctx.drawImage(gameAssets[actions[playerMove]].image,200,350,100,100);   
ctx.drawImage(gameAssets[actions[playerMove]+"H"].image,350,350,100,100);
ctx.drawImage(gameAssets[human.icon].image,50,350,100,100);         
document.getElementById('start-button').innerText = 'Play Again'; 
frame = 4;
}

//
// let testThing = setInterval(rotate,300);
let n = 10;
function animate(){
ctx.clearRect(0,0,500,500);
ctx.drawImage(gameAssets['spiralbg'].image,n,0,500,500)   
n++;
}

let x=100;

x = 0;
// let tagLines = ['Rock...','Paper...','Scissors'];
function animateRPS(){
if(x <=2){
    ctx.clearRect(0,0,500,500);
    console.log(x);

    if(x%2){ 
        ctx.drawImage(gameAssets['bubbleleft'].image,155,150,200,200); 
        ctx.drawImage(gameAssets[human.icon].image,50,350,100,100); 
    }
    
    else {
        ctx.drawImage(gameAssets['bubble'].image,155,150,200,200); 
        ctx.drawImage(gameAssets['tiger'].image,350,350,100,100);                
    } 
    
    ctx.drawImage(gameAssets[actions[x]].image,200,200,100,100);
    
    document.getElementById('center-screen').textContent = `${actions[x]} ...`
    x++;
}else{
    x = 0;
    drawFirstFrame();
    clearInterval(countdown);
}            
// if(x === 3){x++;}else{x++}
}
