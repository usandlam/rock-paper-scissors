class Player {
    constructor(){
        this.action = 0;
        this.health = 10;
        this.score = 0;
        this.icon = '';
        this.enemy = '';
        this.lastRound;
        this.round = [];
    }

    chooseIcon(choice,who){
        //this.enemy
        //this.icon
        //playerIcons
        //enemyIcons
        if(who == 'self'){
            this.icon = iconChoices.icon[choice];
        }else{
            this.enemy = iconChoices.enemy[choice];
        }
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

    twemoji.forEach(asset => buildGameObj(asset.label,asset.code));
    loadGame();

    document.getElementById('start-button').onclick = () => {
        switch(gameState) {
            case -1:
                window.location.reload();
                break;
            case 0:
                playSpace.start();
                toggleDOM('loading');     
                updateCenterText('Choose your player: ');
                iconSelect('icon',0);
                break;
            case 2:
                // playSpace.start();
                // toggleDOM('loading');     
                // updateCenterText('Choose your opponent: ');
                // iconSelect('enemy',1);
                break;                
            case 3:
                gameEnd();
                gameState = 5;
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
function genSrc(icon,canvas){
    let extension = ".svg";
    let path = "latest/svg/";
    let tweSrc = "https://twemoji.maxcdn.com/v/";
    if(navigator.userAgent.indexOf("Firefox") && canvas){
        extension = ".png";
        path = "72x72/"
        tweSrc = "https://twemoji.maxcdn.com/v/latest/"
    }
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
const enemyIcons = ['bear','lion','owl','frog','sloth','dog'];

const gameArea = [];

const hpCounter = [
    genSrc('30-20e3',false),
    genSrc('31-20e3',false),
    genSrc('32-20e3',false),
    genSrc('33-20e3',false),
    genSrc('34-20e3',false),
    genSrc('35-20e3',false),
    genSrc('36-20e3',false),
    genSrc('37-20e3',false),
    genSrc('38-20e3',false),
    genSrc('39-20e3',false),
    genSrc('1f51f',false)];

const gameObj = {};
function buildGameObj(name,codePoint){
    gameObj[name] = {
        codePoint,
        src: function(){return genSrc(this.codePoint,true)},
       loaded: false, h: 100, w: 100};
}

let twemoji = [
    {label:'rock',code:'1faa8'},{label:'paper',code:'1f4c3'},{label:'scissors',code:'2702'},
    {label:'lhand',code:'1f91c'},{label:'palm',code:'1f590'},{label:'rhand',code:'1f91b'},
    {label:'swords',code:'2694'},{label:'bubble',code:'1f5e8'},{label:'tiger',code:'1f42f'},
    {label:'rockh',code:'270a'},{label:'paperh',code:'1f91a'},{label:'scissorsh',code:'270c'},
    {label:'racoon',code:'1f99d'},{label:'panda',code:'1f43c'},{label:'sad',code:'1f614'},
    {label:'speech',code:'1f4ac'},{label:'chick',code:'1f423'},{label:'deer',code:'1f98c'},
    {label:'monkey',code:'1f435'},{label:'wolf',code:'1f43a'},{label:'sloth',code:'1f9a5'},
    {label:'bear',code:'1f43b'},{label:'owl',code:'1f989'},{label:'frog',code:'1f438'},{label:'dog',code:'1f436'}
];

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
        human.chooseIcon(opt,'self');
        toggleDOM('health');
        toggleDOM('score');
        updateCenterText('Choose your opponent: ');
        iconSelect('enemy',1);
        frame++;
        gameState = 1;
    }else if(gameState === 1){
        human.chooseIcon(opt,'enemy');
        gameStart();
        gameState = 2;
    }else if(gameState == 2 && opt < 3){
        human.attack(opt);
        animationID = setInterval(animation,752);
        gameState = 4;
    }else if(gameState == 4){
        gameEnd();
        gameState = 5;
    }else if(gameState == 5){
        gameStart();
    }
}

function updateGameArea(){
    playSpace.clear();
    console.log(frame);
    renderCanvasObj(gameArea[frame]);
    displayHP(human.health);
    displayScore(human.score);
    //check for game over or in displayHP?
}

const iconChoices = {
    icon: ['chick','deer','monkey','panda','racoon','wolf'], 
    enemy: ['bear','tiger','owl','frog','sloth','dog']};

function iconSelect(target,scene){
    //target = icon || enemy
    gameArea[scene] = [];
    let order = 1;
    x = 50;
    y = 350;
    iconChoices[target].forEach(icon =>{
        if(order <= 3){
            gameArea[scene].push( {name:`${icon}`,x,y,r:0},);  
        }else{     
            gameArea[scene].push( {name:`${icon}`,x,y,r:0},);      
        }
        x+=150;
        if(order % 3 == 0){
            y = y - 150;
            x = 50;
        }        
        order++;        
    });
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
    //blow up the bubbles
    gameObj['bubble'].w = 200;
    gameObj['bubble'].h = 200;

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