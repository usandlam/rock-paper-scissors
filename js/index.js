class Player {
    constructor(){
        this.action = 0;
        this.health = 10;
        this.score = 0;
        this.icon = '';
        this.enemy = "tiger";
        this.lastRound;
        this.round = [];
    }

    chooseIcon(opt){
        this.icon = playerIcons[opt];
    }

    attack(attack){
        this.action = attack;
    }

    battle(){
        let huMove = this.action; 
        this.aiMove = this.enemyAttack(); 
        // 0 = rock 1 = paper 2 = scissors
        if( ((huMove + 1) % 3) === this.aiMove ){ //L
            this.lastRound = -1;
        }else if(huMove === this.aiMove ){ //T
            this.lastRound = 0;
        }else{ //W
            this.lastRound = 1; 
        }
        return this.lastRound;
    }

    enemyAttack(){
        return Math.floor(Math.random() * 3);
    }

    roundResult(){
        let text;
        if(this.lastRound === undefined){
            return "You haven't played yet!";
        }
        if(this.lastRound<0){
            text = `${this.enemy} won`;
            this.health--;
        }else if(this.lastRound>0){
            text = `You won!`;
            this.score+=100;
        }else{
            text = `Tie`;
        }
        return text;        
    }
}

window.onload = () => {
    loadGame();

    document.getElementById('start-button').onclick = () => {
        switch(gameState) {
            case -1:
                window.location.reload();
                break;
            case 0:
                charSelect();
                break;
            case 3:
                gameEnd();
                gameState = 4;
                break;
            case 4:
                gameStart();
                break;
            default:
                gameStart();
        }
    };

    document.querySelector('#canvas').addEventListener("mousedown", function(e)
    {
        getMousePosition(myCanvas, e);
    });
};

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    clickEvents(x,y);
    // console.log("Coordinate x: " + x, 
    //             "Coordinate y: " + y);
    }
/*
Firefox SVG Bug Fix
*/
let extension = ".svg";
let path = "latest/";
let tweSrc = "https://twemoji.maxcdn.com/v/latest/";
if(navigator.userAgent.indexOf("Firefox")){
    extension = ".png";
    path = "72x72/"
    tweSrc = "https://twemoji.maxcdn.com/v/latest/"
}

function genSrc(icon){
    return `${tweSrc}${path}${icon}${extension}`
}
/*
Declarations
*/

let gameState = 0;
let frame = 0;

let animationID;

const actions = ['rock','paper','scissors','shoot'];
const human = new Player;

const myCanvas = document.querySelector('#canvas');
const ctx = myCanvas.getContext('2d');

const playSpace = {
    canvas: myCanvas,
    context: ctx,
    start: function () {
        this.interval = setInterval(updateGameArea,750);
    },
    clear: function(){
        ctx.clearRect(0,0,500,500);
    },
}

const playerIcons = ['chick','deer','monkey','panda','racoon','wolf'];
const enemyIcons = ['chick','deer','monkey','panda','racoon','wolf'];

const gameArea = [];

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

const gameObj = {
    rock:{
        icon: '1faa8',
        src: function(){return genSrc(this.icon)},
       loaded: false, h: 100, w: 100,},
    paper: { 
        icon: '1f4c3',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100,},
    scissors: {
        icon: '2702',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,},
    lhand: {
        icon: '1f91c',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,},
    palm: {
        icon: '1f590',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,},        
    rhand: {
        icon: '1f91b',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    swords: {
        icon: '2694',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    bubble: {
        icon: '1f5e8',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 200, w: 200,        
    },
    lbubble: {  // !!! REMOVE THIS !!!
        src: function() {return'./img/bubble-left.svg'},
        loaded: false, h: 200, w: 200,        
    },
    tiger: {
        icon: '1f42f',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    rockh: {
        icon: '270a',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    paperh: {
        icon: '1f91a',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },            
    scissorsh: {
        icon: '270c',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    racoon: {
        icon: '1f99d',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,        
    },
    panda: {
        icon: '1f43c',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100,        
    }, 
    sad: {
        icon: '1f614',
        src: function(){return genSrc(this.icon)},        
        loaded: false, h: 100, w: 100,
    },
    speech: {
        icon: '1f4ac',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100, 
    }, 
    chick: {
        icon: '1f423',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100, 
    }, 
    deer: {
        icon: '1f98c',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100, 
    },
    monkey: {
        icon: '1f435',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100, 
    }, 
    wolf: {
        icon: '1f43a',
        src: function(){return genSrc(this.icon)},
        loaded: false, h: 100, w: 100, 
    },               
    }

function renderCanvasObj(itemArray){
    ctx.clearRect(0,0,500,500);
        itemArray.forEach(item => {
            if(item.r){
                if(item.r == 360){
                    ctx.scale(-1,1);
                    ctx.drawImage(gameObj[item.name].image,-item.x,item.y,gameObj[item.name].h,gameObj[item.name].w);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                }else{
                    ctx.translate(item.x,item.y);
                    ctx.rotate(((item.r*Math.PI)/180));
                    ctx.drawImage(gameObj[item.name].image,0,0,gameObj[item.name].h,gameObj[item.name].w);
                    ctx.rotate(-((item.r*Math.PI)/180));
                    ctx.translate(-item.x,-item.y);
                }
            }else{
                ctx.drawImage(gameObj[item.name].image,item.x,item.y,gameObj[item.name].h,gameObj[item.name].w);
            }
        });
}

function toggleDOM(element){
    document.getElementById(element).classList.toggle('hide');
}

function displayHP(hp){
    healthImage = document.getElementById('hp-img');
    if(hp !== undefined){
        healthImage.src = hpCounter[hp];
    }
    if(hp === 0){
        gameOver();
    }
}

function displayScore(score){
    if(score !== undefined){
        document.getElementById('points').textContent = score;
    }
}

function updateCenterText(text){
    document.getElementById('center-screen').textContent = text;
}

function gameOver(){
    gameArea[frame] = [
        {name:'sad',x:200,y:200,r:0},
    ];
    updateCenterText('Game Over');
    document.getElementById('start-button').innerText = 'Try Again';
    document.getElementById('start-button').classList.remove('hide');
    gameState = -1;
}

function loadGame(){
    for (const obj in gameObj) {
        gameObj[obj].image = new Image();
        gameObj[obj].image.src = gameObj[obj].src();
        gameObj[obj].image.onload = function() {
            gameObj[obj].loaded = true;
            // console.log(`${obj} loaded`);
        }
    }
    document.getElementById('start-button').classList.remove('hide');
    updateCenterText('Press Start to play');
    document.getElementById('loading').src = "./img/wait.svg";
}

function clickEvents(x,y){
    let choice = -1;
    if(y > 350 && y < 450){
        if(x > 50 && x < 150)
            choice = 0;
        else if( x > 200 && x < 300)
            choice = 1;
        else if ( x > 350 && x < 450)
            choice = 2;
    }
    if(y > 200 && y < 340){
        if(x > 50 && x < 150)
            choice = 3;
        else if( x > 200 && x < 300)
            choice = 4;
        else if ( x > 350 && x < 450)
            choice = 5;
    }
    getClick(choice);
}

function getClick(opt){
    if(opt < 0 ) { return -1; }
    // console.log(`Game state # ${gameState}`);
    if(gameState === 0){
        human.chooseIcon(opt);
        gameStart();
        toggleDOM('health');
        toggleDOM('score');      
    }else if(gameState == 2 && opt < 3){
        human.attack(opt);
        animationID = setInterval(animation,752);
        gameState = 3;
    }else if(gameState == 3){
        gameEnd();
        gameState = 4;
    }else if(gameState == 4){
        gameStart();
    }
}

function updateGameArea(){
    playSpace.clear();
    // console.log(frame);
    renderCanvasObj(gameArea[frame]);
    displayHP(human.health);
    displayScore(human.score);
    //check for game over or in displayHP?
}

function charSelect(){
    updateCenterText('Choose your player: ');    
    gameArea[frame] = [];
    let order = 1;
    x = 50;
    y = 350;
    playerIcons.forEach(icon =>{
        if(order <= 3){
            gameArea[frame].push( {name:`${icon}`,x,y,r:0},);  
        }else{     
            gameArea[frame].push( {name:`${icon}`,x,y,r:0},);      
        }
        x+=150;
        if(order % 3 == 0){
            y = y - 150;
            x = 50;
        }        
        order++;        
    });
    playSpace.start();
    toggleDOM('loading');
}

function gameStart(){
    gameArea[frame] = [
        {name:`${human.icon}`,x:200,y:200,r:0},
        {name:'rock',x:50,y:350,r:0},
        {name:'paper',x:200,y:350,r:0},
        {name:'scissors',x:350,y:350,r:0}];        
    // playSpace.start();
    updateCenterText('Pick your move: ');
    toggleDOM('start-button');
    gameState = 2;
}

function gameEnd(){
    let outcome = human.battle();
    let playerMove = actions[human.action];
    let aiMove = actions[human.aiMove];
    let enemyIcon = human.enemy;
    let playerIcon = human.icon;
    updateCenterText(human.roundResult());
    gameArea[frame+1] = [
        // {name:`${aiMove}h`,x:200,y:200,r:0},
        {name:`${aiMove}h`,x:300,y:300,r:180},        
        {name:`${enemyIcon}`,x:50,y:200,r:0},
        {name:`${aiMove}`,x:350,y:200,r:0},                
        {name:`${playerMove}h`,x:200,y:350,r:0},
        {name:`${playerMove}`,x:350,y:350,r:0},
        {name:`${playerIcon}`,x:50,y:350,r:0},
    ];
    document.getElementById('start-button').innerText = 'Play Again'; 
    gameState = 5;
    frame++;
}

let l = 0;
function animation(){
    if( l == 0 ){
        gameArea[frame+1] = [
            {name:'bubble',x:350,y:150,r:360},
            {name:human.icon,x:50,y:350,r:0},
            {name:actions[l],x:200,y:200,r:0},
        ];
        updateCenterText(`${actions[l]}...`);
        frame++;
        l++;        
    }else if( l == 1 ){
        gameArea[frame+1] = [
            {name:'bubble',x:155,y:150,r:0},    
            {name:`${human.enemy}`,x:350,y:350,r:0},
            {name:`${actions[l]}`,x:200,y:200,r:0},
        ];        
        updateCenterText(`${actions[l]}...`);
        frame++;
        l++;
    }else if( l == 2 ){
        gameArea[frame+1] = [
            {name:'bubble',x:350,y:150,r:360},
            {name:human.icon,x:50,y:350,r:0},
            {name:actions[l],x:200,y:200,r:0},
        ]; 
        updateCenterText(`${actions[l]}...`);
        frame++;
        l++
    }else{
        gameArea[frame+1] = [
            {name:'speech',x:350,y:250,r:360},
            {name:'speech',x:150,y:250,r:0},
            {name:human.icon,x:50,y:350,r:0},
            {name:`${human.enemy}`,x:350,y:350,r:0},
            {name:'palm',x:200,y:360,r:0},
            {name:'lhand',x:200,y:490,r:270},
        ]; 
        updateCenterText(`${actions[l]}!`);
        document.getElementById('start-button').innerText = 'Shoot';
        toggleDOM('start-button');
        frame++;
        l = 0;
        clearInterval(animationID);
    }
}