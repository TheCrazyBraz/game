//Der laves funktionen "controller" med givende værdier af x,y,w og h Der bliver givet ved starten af en ny "controller". 
function controller(x,y,w,h){
    //Der opsættes værdier for givende værdier
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.RestartX = x;
    this.RestartY = y;
    
    //Der laves en false or true værdi for at hjælpe statere at "controller" kan bevæge sig.
    this.canMoveX = true;
    
    //Der laves værdier til direktionen.
    this.left = 0;
    this.right = 0;
    this.xDir = 0;
    
    //Der sættes en hastighed op til "controller" på x-aksen.
    this.xSpeed = 4;
    
    //der sættes værdier op til brug for bevægelse på y-aksen.
    this.isGrounded = false;
    this.Gravity = 0.2;
    this.jumpSpeed = 0;
    this.jumpHeight = 7;
    this.jumpNow = false;
    
    //Sopsætning af værdier til "life" funktionen.
    this.startHP = 5;
    this.endHP = this.startHP;
    this.Damage = 0;
    this.newDamage = 0;
    this.Timer = 0;
    this.timerEnd = 160;
    
    //Opsætning af værdier for øjet.
    this.xHat = -10;
    this.d = 1;
    
    //Der laves en lokal funktion kaldet "show" der vil indeholde koden til den visuelle del af "controller".
    this.show = function(){
        //Opsætning af nogle if statement der fotæller hvilke vej "controller" kigger.
        if(this.xDir == -1){this.d = -1}
        if(this.xDir == 1){this.d = 1}
        if(this.d == 1){this.xHat = this.w - 15;}
        if(this.d == -1){this.xHat = +5}
        
        //Opsætning af farver.
        fill(0,255,0);
        //Opsætning af nogle flere if statement der fotæller hvilke vej "controller" kigger.
        if(this.d == 1){
            rect(this.x + this.w, this.y + this.h/2, 4,4);
        } else if(this.d == -1){
            rect(this.x - 4, this.y + this.h/2, 4,4);
        }
        //optegning af "controller".
        rect(this.x, this.y, this.w, this.h);
        fill(255);
        rect(this.x + this.xHat, this.y +10, 10, 10);
    }
    
    //der laves en lokal funktion kaldet "life" der vil indeholde koder til livsbaren og hvor der deles skade til controller "controller"
    this.life = function(){
        //opsætning af timer, så når  "controller" tager skade, at der vil starte et lille delay før "controller" kan tage skade igen.
        if(this.Timer >= this.timerEnd){
            if(this.newDamage > 0){
           this.Damage += this.newDamage
           this.newDamage = 0;
            this.Timer = 0;
            }
        } else{
           this.newDamage = 0;
           this.Timer++
        }
        //Bestemmer hvad det endelige HP vil være.
        this.endHP = this.startHP - this.Damage;
        
        //opsætning af det visuelle til HP baren.
        textSize(26);
        text("Life", 10, 10,400,400);
        textSize(15);
        
        fill(255,0,0);        
        noStroke();
        for(this.i = 0; this.i < this.endHP; this.i++){
           rect(60 + (30 * this.i), 10, 30,30); 
        }
        stroke(1);
    }
}