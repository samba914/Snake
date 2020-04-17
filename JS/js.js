const canva=document.getElementById("canva");
const context=canva.getContext("2d");
let timeChangeeInterval;
let previousFood=1;
//load images
let timeFood;
const ground= new Image();
ground.src="http://localhost/Snake/img/ground.png";

const food=new Image();
food.src="http://localhost/Snake/img/food.png";

const fraise= new Image();
fraise.src="http://localhost/Snake/img/fraise.png";

const bombe= new Image();
bombe.src="http://localhost/Snake/img/bombe.png";

const panier= new Image();
panier.src="http://localhost/Snake/img/panier.png";

const citron=new Image();
citron.src="http://localhost/Snake/img/citron";

const foodImg=new Image();
foodImg.src=food.src;


let score;
let WORLDX=608; 
let WORLDY=608;
let box=32;
let time=4;

let snake;
let FOOD;
let delay;
let WALL;

let head;
var body=document.getElementsByTagName("body");

let WORLD=new Array(WORLDX);

for(let k=0;k<WORLDX;k++){
    WORLD[k]=new Array(WORLDY);
}

//audio
const dead= new Audio(); 
const eat= new Audio(); 
const up= new Audio(); 
const down= new Audio(); 
const left= new Audio(); 
const right= new Audio(); 

dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
down.src="audio/down.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";

const leeg=new Image();
//var button=
leeg.src="http://localhost/Snake/img/test.png"


menuDebut();



function menuDebut(){
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    var buttonJouer=document.createElement("button");
    var buttonInstructions=document.createElement("button");
    buttonJouer.innerText="JOUER";
    buttonJouer.style="position: absolute; top: 320px; width: 230px; padding: 20px 20px 20px 20px; left: 370px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonJouer);
    buttonInstructions.innerText="INSTRUCTIONS";
    buttonInstructions.style="position: absolute; top: 409px; width: 230px; padding: 20px 20px 20px 20px; left: 370px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonInstructions);
    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);
    context.drawImage(leeg,0,0);
   
    buttonInstructions.addEventListener("click",function(){
        instructions();
    }); 
    buttonJouer.addEventListener("click",function(){
        choisirNiveau();
    }); 
    

}
function instructions(){
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    

    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);
    context.fillStyle="white";
    context.font="30px Changa one";
    context.fillText("INSTRUCTIONS",6*box,1.6*box);

    var buttonRetour=document.createElement("button");
    buttonRetour.innerText="RETOUR";
    buttonRetour.style="position: absolute; top: 32px; width: 100px; padding: 10px; left: 20px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonRetour);

    context.font="20px Changa one";

    context.fillText("-Si votre score atteint 10,vous passez à un niveau supérieur.",1*box,4*box)

    context.fillText("-Les fruits disparaissent toutes les 6 secondes s'ils ne sont pas mangés.",1*box,6*box);

    context.fillText("-Il y a 5 différents fruits :",1*box,8*box);
    context.drawImage(food,2*box,8.5*box);
    context.fillText("ce fruit permet d'augmenter votre score de 1",3.5*box,9.2*box);

    context.drawImage(fraise,2*box,9.5*box);
    context.fillText("ce fruit permet d'augmenter votre score de 2.",3.5*box,10.2*box);

    context.drawImage(panier,2*box,10.5*box);
    context.fillText("ce fruit permet de reduire la taille du serpent.",3.5*box,11.2*box);

    context.drawImage(citron,2*box,11.5*box);
    context.fillText("ce fruit permet d'enlever les mures pendants 4 secondes.",3.5*box,12.2*box);

    context.drawImage(bombe,2*box,12.5*box);
    context.fillText("ce fruit vous tue et met fin à la partie, il faut donc l'éviter!",3.5*box,13.2*box);

    buttonRetour.addEventListener("click",function(){
        menuDebut();
    }); 

}


function choisirNiveau(){
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);

    context.fillStyle="white";
    context.font="30px Changa one";
    context.fillText("Chosir un niveau",6*box,1.6*box);

    var buttonRetour=document.createElement("button");
    buttonRetour.innerText="RETOUR";
    buttonRetour.style="position: absolute; top: 32px; width: 100px; padding: 10px; left: 20px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonRetour);

    var buttonNiveau1=document.createElement("button");
    buttonNiveau1.innerText="NIVEAU 1";
    buttonNiveau1.style="position: absolute; top: 100px; width: 100px; padding: 10px; left: 255px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonNiveau1);

    var buttonNiveau2=document.createElement("button");
    buttonNiveau2.innerText="NIVEAU 2";
    buttonNiveau2.style="position: absolute; top: 175px; width: 100px; padding: 10px; left: 255px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonNiveau2);

    var buttonNiveau3=document.createElement("button");
    buttonNiveau3.innerText="NIVEAU 3";
    buttonNiveau3.style="position: absolute; top: 250px; width: 100px; padding: 10px; left: 255px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonNiveau3);

    var buttonNiveau4=document.createElement("button");
    buttonNiveau4.innerText="NIVEAU 4";
    buttonNiveau4.style="position: absolute; top: 325px; width: 100px; padding: 10px; left: 255px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonNiveau4);



    body[0].addEventListener("click",function(event){
     
        if(event.target.nodeName=="BUTTON"){
            if(event.target.innerHTML=="RETOUR"){
                menuDebut();
            }else if(event.target.innerHTML.split('NIVEAU ')[1]){
                let niv=event.target.innerHTML.split('NIVEAU ')[1];
                niveau(niv);
            }
        };

    });
    
}




//niveau(5);
let d="RIGHT";
function niveau(num){
    d="RIGHT";
    score=0;
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    var req = new XMLHttpRequest();
        req.open("GET", "JSON/niveau"+num+".json");
        req.onerror = function() {
                console.log("Échec de chargement "+url);
                };


        req.onload = function() {
                    if (req.status === 200) {
                    var data = JSON.parse(req.responseText);
                
                    WALL=data.walls;                 
                    FOOD=data.food;
                    head= data.head;
                    delay=data.delay;
                    snake=data.snake;

                    head[0]*=box;head[1]*=box;
                    FOOD[0]*=box;FOOD[1]*=box;
                    for(let i=0;i<snake.length;i++){
                        for(let j=0;j<2;j++)
                            snake[i][j]*=box;
                    }    

                    for(let i=0;i<WALL.length;i++){
                        for(let j=0;j<2;j++)
                            WALL[i][j]*=box;
                    }

                    joue(num);
                    // do what you have to do with 'data'
                    } else {
                    console.log("Erreur " + req.status);
                    }
                };
    req.send();
}




function joue(num){
    clearInterval(timeChangeeInterval)
    clearInterval(timeFood)
    time=2.66;
    d="RIGHT";
    document.addEventListener("keydown",direction);
    function direction(event){
        
            if(event.key=='ArrowUp' && d!="DOWN"){
                up.play();
                d="UP";
            }
            if(event.key=='ArrowLeft' && d!="RIGHT"){
                left.play();
                d="LEFT"; 
            }
            if(event.key=='ArrowDown' && d!="UP") {
                down.play();
                d="DOWN"; 
            }
            if(event.key=='ArrowRight' && d!="LEFT"){
            right.play();
                d="RIGHT";
            }  

    }
    function collissionWALL(HEAD){
        for(let i=0;i<WALL.length;i++){
            if(HEAD[0]==WALL[i][0] && HEAD[1]==WALL[i][1]){
                return true;
            }
        }
        return false;
    }

    function collissionBody(HEAD,array){
        for(let i=0;i<array.length;i++){
            if(HEAD[0]==array[i][0] && HEAD[1]==array[i][1]){
                return true;
            }
        }
        return false;
    }


    function step (){
        
        
        context.drawImage(ground,0,0);
        context.fillStyle="white";
        context.font="45px Changa one";
        context.fillText(score,2*box,1.6*box);

        context.fillText("NIVEAU "+num,12*box,1.6*box)
    
        for(let i=0;i<WORLDX;i++){
            for(let j=0;j<WORLDY;j++){
                    WORLD[i][j]="EMPTY";
            }
        }
 
        for(let i=0;i<snake.length;i++){
            WORLD[snake[i][0]][snake[i][1]]="SNAKE";
        }
        for(let i=0;i<WALL.length;i++){
        
            //   context.fillRect(snake[i][0],snake[i][1],box,box);
                WORLD[WALL[i][0]][WALL[i][1]]="WALL";
            }

        WORLD[8*box][box]="TIME"  ;
        WORLD[FOOD[0]][FOOD[1]]="FOOD";
        for(let i=0;i<WORLDX;i++){
            for(let j=0;j<WORLDY;j++){
            
            if(WORLD[i][j]=="SNAKE"){ 
                if(i==head[0]&&j==head[1]){
                    context.fillStyle="green"; 
                    context.fillRect(i,j,box,box);   
                }else{
                    context.fillStyle="white"; 
                    context.fillRect(i,j,box,box);  
                }
                context.strokeStyle="red"
                context.strokeRect(i,j,box,box);
            }
            if(WORLD[i][j]=="WALL"){
                context.fillStyle="black"; 
                context.fillRect(i,j,box,box);
               
            }
            if(WORLD[i][j]=="FOOD"){
                context.drawImage(foodImg,i,j);
 
            }
            if(WORLD[i][j]=="TIME"){
                context.fillStyle="white"; 
                context.fillRect(i,j,80,15);
                
            }
        }
        }
        //changer de direction
        let snakeX=head[0];
        let snakeY=head[1];
        if(d=="UP") snakeY-=box;
        if(d=="DOWN") snakeY+=box;
        if(d=="RIGHT") snakeX+=box;
        if(d=="LEFT") snakeX-=box;

        if(snakeX==FOOD[0] && snakeY== FOOD[1]){

            console.log(foodImg.src);
            if(foodImg.src=="http://localhost/Snake/img/food.png"){
                score++;
            }else if(foodImg.src=="http://localhost/Snake/img/fraise.png"){
                score+=2;
            }else if(foodImg.src=="http://localhost/Snake/img/bombe.png"){
                clearInterval(game);
                clearInterval(timeChangeeInterval);
                time=2.66;
                clearInterval(timeFood);
               dead.play();
               gameOver(score,num);
            }else if(foodImg.src=="http://localhost/Snake/img/citron.png"){
                score++;
                let a=WALL;
                // on annule les barrières pour un temps donné
               let WALLS=WALL.splice(0,WALL.length);
                setTimeout(function(){
                    WALL=WALLS;  
                },3000);
    

            }else if(foodImg.src=="http://localhost/Snake/img/panier.png"){
                score++;
                snake.shift();
                if(snake.length>1)
                    snake.shift();
            }
           
            randomSrcImageFood();
            
            let x;
            let y;
            do{
                x=Math.floor(Math.random()*17+1)*box;
                y=Math.floor(Math.random()*15+3)*box;
            }while(inWallOrSnake(x,y));
            

            eat.play();

            //choisir le fruits affaire apparaitre
            if(score>=10){
                clearInterval(game);
                clearInterval(timeChangeeInterval);
                time=2.66;
                clearInterval(timeFood);
                if(num<4){
                    num++;
                    splashScreenNiveau(num);
                }else{
                  
                    finDeJeu();
                }
            }
            FOOD[0]=x;
            FOOD[1]=y;
            clearInterval(timeFood);
            time=2.66;
            timeFood=setInterval(foodRandom,6000);
            clearInterval(timeChangeeInterval)
            timeChangeeInterval=setInterval(timeChange,200);
        }else{
            snake.shift();
        }

     
        head=[snakeX,snakeY];
       
        
        //pour passer de l autre coté
        if(snakeX==-32 &&!collissionWALL(head))head=[18*box,snakeY];
        if(snakeX==18*box &&!collissionWALL(head))head=[0,snakeY];
        if(snakeY==1*box &&!collissionWALL(head))head=[snakeX,18*box];
        if(snakeY==19*box &&!collissionWALL(head))head=[snakeX,2*box];

            //game over
            if(collissionWALL(head)||collissionBody(head,snake)){
                clearInterval(game);
                clearInterval(timeChangeeInterval);
                time=2.66;
                clearInterval(timeFood);
               dead.play();
               gameOver(score,num);
            }
        
        snake.push(head);  

    }

    console.log(delay)
    let game=setInterval(step,delay);
    

    function foodRandom(){
            randomSrcImageFood();
            let x;
            let y;
            do{
                x=Math.floor(Math.random()*17+1)*box;
                y=Math.floor(Math.random()*15+3)*box;
            }while(inWallOrSnake(x,y));

            FOOD[0]=x;
            FOOD[1]=y;
            time=2.66;
    }
    timeFood=setInterval(foodRandom,6000);

    function randomSrcImageFood(){
        let randomFruit;
        
        do{
            randomFruit=Math.floor(Math.random()*5+1);
        }while(randomFruit==previousFood);
        previousFood=randomFruit;
        if(score>8){
            randomFruit=Math.floor(Math.random()*4+1);
        }
        switch(randomFruit){
            case 1: foodImg.src="http://localhost/Snake/img/food.png";break;
            case 2: foodImg.src="http://localhost/Snake/img/fraise.png";break;
            case 3: foodImg.src="http://localhost/Snake/img/bombe.png";break; 
            case 4: foodImg.src="http://localhost/Snake/img/panier.png";break;
            case 5: foodImg.src="http://localhost/Snake/img/citron.png";break;
        }
    }

    function timeChange(){
        context.fillStyle="red"; 
        context.fillRect(8*box,box,time,15);
        time+=2.66;

    }
     timeChangeeInterval=setInterval(timeChange,200);

   
     function inWallOrSnake(x,y){
        let test=[x,y];
        if(collissionWALL(test) || collissionBody(test,snake)){
            return true;
        }else{
            return false;
        }
    
    }

}    

function splashScreenNiveau(num){
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);
    context.fillStyle="white";
    context.font="40px Changa one";
    context.fillText("NiVEAU SUIVANT :)",5*box,6*box);
    
    setTimeout(function(){
        console.log("ded");
        niveau(num)
    },1000);

}

function finDeJeu(){
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);
    context.fillStyle="white";
    context.font="40px Changa one";
    context.fillText("FIN DE JEU! BIEN JOUE :)",3*box,6*box);
    var buttonMenu=document.createElement("button");
    buttonMenu.innerText="RETOUR MENU";
    buttonMenu.style="position: absolute; top: 350px; width: 230px; padding: 20px 20px 20px 20px; left: 210px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonMenu);
    buttonMenu.addEventListener("click",function(){
        menuDebut();
    }); 
}
function gameOver(score,level){
    d="RIGHT";
    while(body[0].hasChildNodes()&& body[0].lastChild.nodeName!="CANVAS" ){body[0].removeChild(body[0].lastChild);}
    context.fillStyle="#a4dc4c"
    context.fillRect(0,0,608,608);
    context.fillStyle="white";
    context.font="40px Changa one";
    context.fillText("GAME OVER :(",5*box,6*box);
    context.font="20px Changa one";
    context.fillText("SCORE : "+score,6*box,8*box);
    var buttonMenu=document.createElement("button");
    var buttonRejouer=document.createElement("button");
    buttonMenu.innerText="RETOUR MENU";
    buttonMenu.style="position: absolute; top: 405px; width: 230px; padding: 20px 20px 20px 20px; left: 210px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonMenu);

    var buttonRejouer=document.createElement("button");
    buttonRejouer.innerText="REJOUER";
    buttonRejouer.style="position: absolute; top: 320px; width: 230px; padding: 20px 20px 20px 20px; left: 210px;    border: green 8px solid;      background-color: #a4dc4c; color: white;";
    body[0].appendChild(buttonRejouer);


    buttonRejouer.addEventListener("click",function(){
        niveau(level);
    }); 
    buttonMenu.addEventListener("click",function(){
        menuDebut();
    }); 
  
}

