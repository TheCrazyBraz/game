//Indstilling af hændelseslytteren til tastaturindgang.
window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);

//Displayet vil holde objekterne for kortet.
var Display;

//Spilleren vil holde den kode, som afspilleren direkte kontakter med.
var Player;

//Fjender vil holde aisens genstande
var Enemies = []

//Gør to variabler til brug i senere funktioner.
var g = 0;
var wh = 2;

//Oprettelse af en timer til optimering i "Fjender".
var timerEnd = 5;

var LastX;

//Oprettelse af "setup" funktionen, der bruges i starten af scriptet.
function setup() {
    //Indstilling af lærredet.
    createCanvas(800, 600);

    //Opsætning af "Player" og "Display" som objekter. "Player" vil også give nogle værdier af x, y, w og h.
    Display = new display();
    Player = new controller(5, 100, 35, 45);
    
    //Ringer de funktioner, der er nødvendige for at køre dem i starten af ​​spillet.
    Display.Start();
    spawnEnemies();
}

//Oprettelse af "draw" -funktionen, der vil blive kaldt hver frame.
function draw(){
    //Indstil farven på baggrunden.
    background(0,0,50);
    
    //Opkald til den funktion, der skal opdatere hver ramme.
    Display.draw();
    enemyUpdate();
    playerUpdate();
}

//Oprettelse af en funktion kaldet "playerUpdate", der vil indeholde al funktion og en enkelt kode, der gør "Player" arbejde.
function playerUpdate(){
    if(Player.endHP == 0){
        RestartPlayer();
    }
    //Angiver retningen af ​​"Player".
    Player.xDir = Player.left + Player.right;
    
    //Ringer nogle lokale funktioner inde i "Player" -objektet.
    Player.show();
    Player.life();
    
    //Ringer funktionen "movePlayer".
    movePlayer();
}

//Oprettelse af en funktion kaldet "enemyUpdate", der indeholder alle funktioner og en enkelt kode, der gør "Enemies" arbejde. 
function enemyUpdate(){    
    if(Player.endHP != 0){
    //Gør en for hver sætning, der vil køre koden for alle "Fjender".
    for(var i = 0 ; i < Enemies.length; i++){
        
        if(Enemies[i].AttackedByPlayer == false){
        enemyFall(i);
        damagePlayer(i);
        seePlayer(i);
        
        //Hvis den lokale værdi af "fallOff" er 1, falder "Enemy" ikke i egdes.
        if(Enemies[i].fallOff == 1){
           enemyDontFallLeft(i);
           enemyDontFallRight(i);
        }
            
        enemyDontMoveLeft(i);
        enemyDontMoveRight(i);
        
        Enemies[i].draw();
        
        //Kontrollerer, om "Player" er inden for rækkevidde, og hvis det er, så følger det andet, som det vil patruljeres.
        if(Enemies[i].isInRange == false){
            Enemies[i].patrol();
            Enemies[i].Timer = 0;
        } else{
        if(Enemies[i].Timer == timerEnd){
            Enemies[i].xTarget = Player.x;
            Enemies[i].Timer = 0;
        }
        if(Enemies[i].Timer < timerEnd){
            Enemies[i].Timer++
        }
        Enemies[i].wTarget = Player.w;
        Enemies[i].followPlayer();
        }
    }
    }
    } else{
        for(var i = 0 ; i < Enemies.length; i++){
        RestartEnemies(i);
        }
    }
}

//Opkald to funktioner ved hjælp af eventlistiner i starten af scriptet for at få tastaturindgangen.
function checkKeyDown(key){
    if(key.keyCode == "65"){Player.left = -1}
    if(key.keyCode == "68"){Player.right = 1}
    
    if(key.keyCode == "32"){Player.jumpNow = true}
}
function checkKeyUp(key){
    if(key.keyCode == "65"){Player.left = 0}
    if(key.keyCode == "68"){Player.right = 0}

    if(key.keyCode == "32"){Player.jumpNow = false}

}

//Oprettelse af en funktion kaldet "spawnEnemies", der vil indeholde alle de pushfunktioner, der bruges til at oprette flere af "ai" -objekterne.
function spawnEnemies(){
    //"Ai" objekterne vil give værdier af x1, x2, y, w, h og fallOff.
    Enemies.push(new ai(755, 50, 150, 35,45, 2));
    Enemies.push(new ai(500, 700, 150, 35,45, 1));
    Enemies.push(new ai(140, 365,150,35,45, 1));
}

//Oprettelse af en variabel "enemyFall" som en funktion til at efterligne tyngdekraften på "Fjender".
var enemyFall = function(e){
    //Oprettelse af konstant tyngdekraft, der efterligner virkeligheden af tyngdekraften.
    Enemies[e].g += Enemies[e].Gravity
    for (var i = 0; i < Enemies[e].g; i += 0.05){
        if(placeFree(Enemies[e].x, Enemies[e].y + Enemies[e].g - i)){
            Enemies[e].y += Enemies[e].g - i;
            Enemies[e].canMove = false; 
            break;
        } else {
            Enemies[e].g = 0;
            Enemies[e].canMove = true;
        }
    }
}

//Oprettelse af en variabel "enemyDontMove" som en funktion til venstre og højre, der kontrollerer om der er en "Block" i vejen for "Fjender".
var enemyDontMoveLeft = function(i){
    var tempObjLeft = {x: Enemies[i].x - 1, y: Enemies[i].y + 2, w: 1, h: Enemies[i].h - 4}
    
    if(enemyPlaceFree(Enemies[i].x - 2, Enemies[i].y + 2, 1, Enemies[i].h - 4) == false){
        Enemies[i].dontMoveleft = true;
    } else{
        Enemies[i].dontMoveleft = false;
    }
}
var enemyDontMoveRight = function(i){
    var tempObjRight = {x: Enemies[i].x + Enemies[i].w + 1, y: Enemies[i].y, w: 1, h: Enemies[i].h}

    if(enemyPlaceFree(Enemies[i].x + Enemies[i].w + 1, Enemies[i].y + 2, 1, Enemies[i].h - 4) == false){
        Enemies[i].dontMoveright = true;
    } else{
        Enemies[i].dontMoveright = false;
    }
}

//Oprettelse af en variabel "fjendeDontFall" som en funktion til venstre og højre, der kontrollerer, om der er et lag på en "Blok" for at gå videre.
var enemyDontFallLeft = function(i){
    var tempObjLeft = {x: Enemies[i].x - wh - 1, y: Enemies[i].y + Enemies[i].h + 1, w: wh, h: wh}

    if(enemyPlaceFree(Enemies[i].x - Enemies[i].w - 1, Enemies[i].y + Enemies[i].h + 1, Enemies[i].w, Enemies[i].h) == true){
        Enemies[i].dontFallleft = true;
        Enemies[i].dontFallright = false;    
    } else{
        Enemies[i].dontFallleft = false;
    }
}
var enemyDontFallRight = function(i){
    var tempObjRight = {x: Enemies[i].x + Enemies[i].w + 1, y: Enemies[i].y + Enemies[i].h, w: wh, h: wh}

    if(enemyPlaceFree(Enemies[i].x + Enemies[i].w + 1, Enemies[i].y + Enemies[i].h + 1, Enemies[i].w, Enemies[i].h) == true){
        Enemies[i].dontFallright = true;    
        Enemies[i].dontFallleft = false;
    } else{
        Enemies[i].dontFallright = false;
    }
}

//Oprettelse af en variabel "enemyPlaceFree" som en funktion til at bestemme, om "Enemies" kan flytte til deres nye position.
var enemyPlaceFree = function(xNew,yNew,wNew,hNew){
    var tempObj = {x: xNew, y: yNew, w: wNew, h: hNew};
    
    for (var i = 0; i < Display.Blocks.length; i++){
        if(collisionDetect(tempObj, Display.Blocks[i]) == true){
            return false;
        } else {
            if(i == Display.Blocks.length - 1){
            return true;
            }
        }
    }
}

//Oprettelse af en variabel "damagePlayer" som en funktion, der vil skade skader på "Player", hvis det er sammen med en af ​​"Enemies" ved at tilføje på den lokale varible af "Player" kaldet "newDamage".
var damagePlayer = function(i){
    if(collisionDetect(Player, Enemies[i]) && Enemies[i].AttackedByPlayer == false){
       Player.newDamage = 1;
       }
}

//Oprettelse af en variabel "seePlayer" som en funktion, der afgør, hvis "Player" er inden for rækkevidden af den enkelte "Enemies".
var seePlayer = function(i){
    var tempView = {x: Enemies[i].xSee, y: Enemies[i].ySee, w: Enemies[i].wSee, h: Enemies[i].hSee}
    //Oprettelse af en sightline for "Fjender".
     if(collisionDetect(Player, tempView)){
        Enemies[i].isInRange = true;
    }
    
    //Brug Pythagoras sætning til at tegne en direkte linje mellem "Player" og "Enemies".
    var a = (Player.x + (Player.w / 2)) - (Enemies[i].x + (Enemies[i].w / 2));
    var b = (Player.y + (Player.h / 2)) - (Enemies[i].y + (Enemies[i].h / 2));
    var c = Math.sqrt( a*a + b*b );
    var maxDist = 200;
    
    //Fortæller hvad "Fjender" skal gøre "Player" er inden for rækkevidde på den forskellige akse og tilføjer en timer for at reducere antallet af tid på 1 sekund, det vil udføre disse handlinger for optimering.
    if(Enemies[i].isInRange == true){
        if(c > maxDist){
            Enemies[i].isInRange = false;
            Enemies[i].seeTimer = 0;
        } else if(Player.y + Player.h < Enemies[i].y){
            if(Enemies[i].seeTimer >= 240){
                Enemies[i].isInRange = false;
                Enemies[i].seeTimer = 0;
            } else if(Enemies[i].seeTimer < 240){
                Enemies[i].seeTimer += 1;
            }
        } else if (Player.y > Enemies[i].y + Enemies[i].h){
            if(Enemies[i].seeTimer >= 240){
                Enemies[i].isInRange = false;
                Enemies[i].seeTimer = 0;
            } else if(Enemies[i].seeTimer < 240){
                Enemies[i].seeTimer += 1;
            }
        }
    }
}

//Oprettelse af en variabel "movePlayer" som en funktion til at flytte "Player" på x-aksen såvel som hvis "Player" skal bruge "playerFall" eller "playerJump".
var movePlayer = function(){
    //Oprettelse af en midlertidig variabel, der kopierer "Player" retningen.
    var dir = Player.xDir;
    
    //Gør en for hver sætning, der vil reducere afstanden, "Player" vil rejse, indtil den ikke kolliderer med nogen af ​​"Blocks"
    for (var s = Player.xSpeed; s > 0; s--){
        if(placeFree(Player.x + s * Player.xDir, Player.y) == true){
            Player.x += s * dir;
            break;
        }
    }
    
    //Skifter mellem "playerJump" og "playerFall" baseret på værdien af "jumpSpeed", som er en lokal variabel af "Player".
    if(Player.jumpSpeed > 0){
        playerJump();
        
    } else if (Player.jumpSpeed <= 0){
        playerFall();  
    } 
};

//Oprettelse af en variabel "playerJump" som en funktion til at efterligne en opadgående kraft, der langsomt reduceres på grund af kunstig tyngdekraft.
var playerJump = function(){   
    //Opsætning af en for hver sætning for at kontrollere alle "Blokke".
    for (var i = 0; i < (Player.jumpSpeed); i += 0.1){
        //Opsætning af en for hver sætning for at kontrollere alle "Blokke".
        if(placeFree(Player.x, Player.y - (Player.jumpSpeed - (g - i)))){
            Player.y -= Player.jumpSpeed - g - i;
            break;
        }
        //Hvis der ikke er mere kraft så ændres det til "playerFall".
        if (Player.jumpSpeed - g - i <= 0){
            g = 0;
            Player.jumpSpeed = 0;
        } 
    }
    //Efterligning af tyngdekraften.
    g += Player.Gravity;
    if (Player.jumpSpeed - g <= 0){
        g = 0;
        Player.jumpSpeed = 0;
    }
}

//Oprettelse af en variabel "playerFall" som en funktion til at efterligne tyngdekraften på "Player".
var playerFall = function(){
    //"Player" vil altid bruge "playerFall" før den bruger "playerJump" og denne hvis sætning vil ændre den.
    if(Player.jumpNow == true && (placeFree(Player.x, Player.y + 1)) == false){
       Player.jumpSpeed = Player.jumpHeight;
    }
    
    //Oprettelse af konstant tyngdekraft, der efterligner virkeligheden af tyngdekraften.
    g += Player.Gravity
    for (var i = 0; i < g; i += 0.05){
        if(placeFree(Player.x, Player.y + (g - i))){
            Player.y += g - i;
            break;
        } else {
            g = 0;
            break;
        }
    }
}

//Oprettelse af en variabel "placeFree" som en funktion til at bestemme, om "Player" kan flytte til sin nye position.
var placeFree = function(xNew, yNew){
    //Oprettelse af et midlertidigt rektangel, der efterligner "Player".
    var tempObj = {x: xNew, y: yNew, w: Player.w, h: Player.h};
    //Oprettelse af en for hver sætning for at kontrollere mellem alle "Blokke".
    for (var i = 0; i < Display.Blocks.length; i++){
        //Hvis det rammer endda en "Blok", vil den returnere falsk.
        if(collisionDetect(tempObj, Display.Blocks[i]) == true){
            return false;
        } else {
            //Hvis det ikke rammer en, så kommer det tilbage sandt.
            if(i == Display.Blocks.length - 1){
            return true;
            }
        }
    }
}

//Oprettelse af en variabel "collisionDeteect" som en funktion til at bestemme, om to rektangler kolliderer med hinanden og returnerer en værdi af enten true eller false baseret på resultatet.
var collisionDetect = function(r1, r2) {
  if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
      return true;
  } else {
    return false;
  }
}
//Genstarter posititonerne for valgte værdier
var RestartEnemies = function(i){
    Enemies[i].x = Enemies[i].RestartX;
    Enemies[i].y = Enemies[i].RestartY;
    Enemies[i].isInRange = false;
}
//Genstarter posititonerne for valgte værdier
var RestartPlayer = function(){
    Player.x = Player.RestartX;
    Player.y = Player.RestartY;
    
    Player.Damage = 0;
}