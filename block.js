//Der laves en funktion der kaldes "block" som holder koden for hver individuel "block". de to værdier brugt er x og y position.
function block(x,y){
    //Der laves lokale værdier for x og y der skal udgives ved kreationen af hvert induviduelt objekt "display.js".w og h er størrelsen af "block".
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    
    //Der laves en lokal funktion "draw" der indeholder alt den visuelle kode for "block".
    this.draw = function(){
    //Farven til "block".
    fill(139,69,19);
    //Der laves en rektangel til "block" med de lokale værdier x,y,w og h.
    rect(this.x, this.y, this.w, this.h);
    }
}