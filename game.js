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
  grille.mouseover();
  affichage.show();
}


function mouseClicked() 
{
  if (affichage.state ==0)
  {
    grille.click();
  }

  if (affichage.state ==1)
  {
    affichage.click_gagne();
  }


  if (affichage.state ==2)
  {
    affichage.click_perdre();
  }
}

function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   3 = gagné + continue
   */
  this.state = 1; // 0 pour partie en cours

  this.gagner = function() {
    if (this.state == 0)
    {
      this.state = 1;
    }
  }
  this.perdre = function() {
    this.state = 2;
  }
  this.show = function() {
    if (this.state == 1)
    {
      fill(color(0, 255, 0));
      rect(120, 200, 600, 500);
      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, height/2-100);

      if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
      {        
        // DRAW BOX
        fill(color(0, 200, 0));
        rect(220, 540, 420, 60);
        
        //DRAW BUTTON
        textSize(30);
        fill(0);
        text("Continuer à jouer", width/2, 580);
      } else
      {
        //DRAW BOX
        fill(color(0, 150, 0));
        rect(220, 540, 420, 60);
        
        //DRAW BUTTON
        textSize(30);
        fill(0);
        text("Continuer à jouer", width/2, 580);
      }
    } else if (this.state == 2) {
      fill(color(0, 255, 0));
      rect(120, 200, 600, 500);

      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);
    }
  }

  this.click_gagne = function()
  {
    if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
    {
      affichage.state =0;
    }
  }

  this.click_perdre = function()
  {
  }
}