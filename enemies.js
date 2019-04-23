//Oprettelse af en funktion kaldet "ai" med input, x1, x2, y, w, h og fallOff, der givet når funktionen først er kaldt
function ai(x1, x2, y, w, h, fallOff){
    //Oprettelse af lokale værdier.
    //Sørger for, at x1 er det mindste af koordinater, der giver det, der bruges til at patruljeres mellem, x1 og x2.
    if(x1 < x2){
    this.x1 = x1;
    this.x2 = x2;
    } else if(x1 > x2){
    this.x1 = x2;
    this.x2 = x1;          
    }
    
    //Gør et lokalt fallOff, der er enten 1 eller 2.
    this.fallOff = fallOff;
    
    //Angivelse af de lokale værdier ved starten af hver "ai".
    this.x = x1;
    this.y = y;
    this.w = w;
    this.h = h;

    this.RestartX = x1;
    this.RestartY = y;
    
    //Oprettelse af de værdier, der senere bruges til bevægelse.
    this.xDir = 0;
    this.Gravity = 0.2;
    this.g = 0;
    this.xSpeed = 1.75;
    this.d = 1;
    this.canMove = false;
    this.oldxDir;
    this.left = -1;
    this.right = 1;
    this.way = 0;
    
    //Oprettelse af værdier for målet, som vil være spilleren.
    this.xTarget = 0;
    this.wTarget = 0;
    this.newXTarget = 0;
    
    //En værdi, der er påvirket i "main.js" og er vant til at vide, om den lokale "ai" kan se afspilleren.
    this.isInRange = false;
    
    //Værdier bruges til at oprette et synsfelt.
    this.xSee;
    this.ySee;
    this.wSee = 150;
    this.hSee;
    
    //Oprettelse af værdier, der påvirkes i "main.js" og bruges til at bestemme, om den lokale "ai" kan fortsætte med at bevæge sig i en retning.
    this.dontFallleft = false;
    this.dontFallright = false;
    this.dontMoveleft = false;
    this.dontMoveright = false;
    
    //Opsætning af et lokalt ur.
    this.Timer = 0;
    
    //Oprettelse af en lokal timer for at hjælpe "ai" gå videre efter en tid efter at have mistet afspilleren.
    this.seeTimer = 0;
    
    //Gør det rigtigt, hvis "Player" angriber.
    this.AttackedByPlayer = false;
    
    //Oprettelse af en lokal funktion kaldet "patrulje", som vil indeholde den kode, der bruges til at flytte "ai" mellem punkter, x1 og x2, der gav i begyndelsen af "ai".
    this.patrol = function(){
        //Opsætning af en if-sætning, der bruges efter den lokale "follow" funktion for at sikre, at "ai" vil fortsætte med at bevæge sig.
        if(this.oldxDir == 1){
            this.right = 1;
            this.left = 0;
        } else if(this.oldxDir == -1){
            this.right = 0;
            this.left = -1;
        }
        
        //Opsætning af en hvis statement, der bruges til at flytte "ai" mellem to punkter.
        if(this.x1 != this.x2){
            if(this.way == 0){
                if(this.x + this.w < this.x2){
                    //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                    if(this.dontFallright == false){
                        this.right = 1;
                        this.left = 0;
                    } else{
                        this.way = 1;
                    }
                    //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                    if(this.dontMoveright == false){
                        this.right = 1;
                        this.left = 0;
                    } else{
                        this.way = 1;
                    }
                } else{
                    this.way = 1;
                }
            } else if(this.way == 1){
                if(this.x > this.x1){
                    //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                    if(this.dontFallleft == false){
                        this.left = -1;
                        this.right = 0;
                    } else {
                        this.way = 0;
                    }
                    //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                    if(this.dontMoveleft == false){
                        this.right = -1;
                        this.left = 0;
                    } else{
                        this.way = 0;
                    }
                } else{
                    this.way = 0;
                }
            }
        } else{
            //Hvis der ikke er nogen afstand mellem de to patruljepunkter, vil "ai" ikke bevæge sig.
            this.right = 0;
            this.left = 0;
        }
        
        //Angiver retningen for "ai". Hvis det er -1, så er det tilbage, 0, så er det stilstand, og hvis det er 1, så er det rigtigt.
        this.xDir = this.left + this.right;
        //"oldxDir" bruges, når "ai" skifte fra funktionen "followPlayer" og tilbage til "patrol" -funktionen.
        this.oldxDir = this.xDir;
        
        //Lav en if-erklæring, der vil lade "ai" flytte, hvis det falder ned, hvis det fortsætter med at bevæge sig.
        if(this.dontFallleft == true){
            if(this.xSpeed * this.xDir < 0){
               this.xDir = 0;
               }
        }
        //Lav en if-erklæring, der vil lade "ai" flytte, hvis det falder ned, hvis det fortsætter med at bevæge sig.
        if(this.dontFallright == true){
           if(this.xSpeed * this.xDir > 0){
               this.xDir = 0;
           }
        }
        
        //Hvis "ai" ikke er i luften, så er "ai" lov til at bevæge sig.
        if(this.canMove == true){
            //Rykker "ai" på x-aksen.
            this.x += this.xSpeed * this.xDir;
        }
    }
    
    //Oprettelse af en lokal funktion kaldet "followPlayer"
    this.followPlayer = function(){
        if(this.x != this.xTarget){
            if(this.x + this.w < this.xTarget){
                //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                if(this.dontFallright == false){
                    this.right = 1;
                    this.left = 0;
                } else{
                    this.right = 0;
                }
                    //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.              
                if(this.dontMoveright == false){
                    this.right = 1;
                    this.left = 0;
                } else{
                    this.right = 0;
                }
            } else if(this.x + this.w > this.xTarget){
                //Hvis "ai" er inden for rækkevidde af afspilleren, så stopper den.
                this.right = 0;
            }
            if(this.x > this.xTarget + this.wTarget){
                //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.
                if(this.dontFallleft == false){
                    this.left = -1;
                    this.right = 0;
                } else {
                    this.left = 0;
                }
                //Hvis funktionen i "main.js" bliver falsk, skal du fortsætte med at flytte til højre.               
                if(this.dontMoveleft == false){    
                    this.right = -1;    
                    this.left = 0;
                } else{
                    this.left = 0;
                }
            } else if(this.x < this.xTarget + this.wTarget){
                //Hvis "ai" er inden for rækkevidde af afspilleren, så stopper den.
                this.left = 0;
            }
        }
        
        //opsættelse af direktion.
        this.xDir = this.left + this.right
        if(this.xDir != 0){
            //Indstilling af "oldxDir" til brug i funktionen "patrulje".
            this.oldxDir = this.xDir;
        }
        //Hvis funktionen i "main.js" bliver sand, skal du stoppe med at flytte til venstre.
        if(this.dontFallleft == true){
            if(this.xSpeed * this.xDir < 0){
               this.xDir = 0;
            }
        }
        //Hvis funktionen i "main.js" bliver sand, skal du stoppe med at flytte til højre.
        if(this.dontFallright == true){
            if(this.xSpeed * this.xDir > 0){
               this.xDir = 0;
            }
        }
        
        //Hvis "ai" ikke er i luften, så er "ai" lov til at bevæge sig.
        if(this.canMove == true){
            this.x += this.xSpeed * this.xDir;
        }
    }
    
    //Oprettelse af en lokal funktion kaldet "draw" og vil indeholde den visuelle kode.
    this.draw = function(){
        //Indstilling af farven på hoveddelene af "ai".
        fill(255,0,0);
        //Oprettelse af en if-erklæring for at bestemme hvilken vej "ai" skal se ud.
        if(this.oldxDir == 1){
            //Får næsen til at dukke op på højre side.
            rect(this.x + this.w, this.y + this.h/2, 4,4);
            this.xHat = this.w - 15;
        } else if(this.oldxDir == -1){
            //For næsen til at dukke op på venstre side.
            rect(this.x - 4, this.y + this.h/2, 4,4);
            this.xHat = 5;
        }
        //Gør hoveddelen af "ai" kroppen.
        rect(this.x, this.y, this.w, this.h);
        
        //Opret øjet med farven sort.
        fill(0);
        rect(this.x + this.xHat, this.y + 10, 10, 10);
        
        //Angiver værdier, der skal bruges i "main.js".
        this.xSee = this.x + (this.w/2) - this.wSee/2;
        this.ySee = this.y + 1;
        this.hSee = this.h - 1;
    }
}