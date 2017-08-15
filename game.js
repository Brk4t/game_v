// GAME VERSION 1.0

var affichage;
var img;


function setup() {
  createCanvas(840, 1000);

  var sz = 6;
  grille = new Grid(sz);
  grille.init();
  var i = 0;
  while ( i< sz)
  {
    grille.brique_appear();
    i++
  }
  grille.calculate();
  grille.display();
  i = 0;
  while ( i< sz)
  {
    grille.brique_appear();
    i++
  }

  affichage = new EndGame();
}
function draw() {
  background((10, 10, 40));
  grille.calculate();
  grille.display();
  affichage.show();

  grille.mouseover();
}




function mouseClicked() 
{
  grille.click();
}

function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   */
  this.state = 0;

  this.gagner = function() {
    this.state = 1;
  }
  this.perdre = function() {
    this.state = 2;
  }
  this.show = function() {
    if (this.state == 1)
    {
      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, height/2-100);
    } else if (this.state == 2) {
      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);
    }
  }
}