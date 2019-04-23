//Opsætning af koden til "display" der indeholder koden for levels eller maps.
function display(){
    //opsætning af lokal array der kaldes "Blocks" der er brugt til at holde alt fra "block".
    this.Blocks = [];
    
    //Opsætning af lokal funktion kaldet "Start" og bruges i starten af programmet til opsætning af alle de forskellige blokke, der bruges til at oprette kortet.
    this.Start = function(){
        this.map1();
    }

    //Oprettelse af en lokal funktion kaldet "draw" og bruges til at indeholde en forEach-sætning.
    this.draw = function(){
        //kalder tegnefunktionen for alle blokke inde i "Blokke" array.
        this.Blocks.forEach(block => {block.draw();})
    }
    
    this.map1 = function(){
    //Oprettelse af alle de blokke, der bruges som jord.
    this.Blocks.push(new block(0,450));
    this.Blocks.push(new block(0,400));
    this.Blocks.push(new block(0,350));
    this.Blocks.push(new block(50,450));
    this.Blocks.push(new block(750, 450));
    
    this.Blocks.push(new block(150, 300));
    this.Blocks.push(new block(200, 300));
    this.Blocks.push(new block(250, 300));

    this.Blocks.push(new block(450, 300));
    this.Blocks.push(new block(500, 250));
    this.Blocks.push(new block(550, 250));
    this.Blocks.push(new block(600, 250));
    this.Blocks.push(new block(650, 250));
    this.Blocks.push(new block(650, 200));

    this.Blocks.push(new block(500, 100));

    this.Blocks.push(new block(250, 100));
    this.Blocks.push(new block(300, 100));
    this.Blocks.push(new block(350, 100));

    //Oprettelse af en forklaring i stedet for at gøre dem alle for hånden. Dette skaber de to mest elskede jordlinier, følger den vandrette linje og en øverste linje, der er ude af skærmen for at sikre, at afspilleren ikke hopper ud af skærmen.
    for (var i = 0; i < (width/50); i++){
        this.Blocks.push(new block(0 + i * 50 , 550));
        this.Blocks.push(new block(0 + i * 50 , 500));
        this.Blocks.push(new block(0 + i * 50 , -50));
    }
    
    //Oprettelse af en forklaring til to linjer, der ligger uden for skærmen for at sikre, at afspilleren ikke hopper ud af skærmen, efter den lodrette linje.
    for(var e = 0; e < (height/50); e++){
        this.Blocks.push(new block(-50, 0 + e*50));
        this.Blocks.push(new block(width, 0 + e * 50));
    }    
    }
}
