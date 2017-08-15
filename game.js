// GAME VERSION 1.0

var affichage;
var img;
var sz = 6;

function setup() {
  createCanvas(840, 1000);

  grille = new Grid(sz);
  grille.init();


  affichage = new EndGame();
}


function draw() {
  background((10, 10, 40));
  image(bckgrnd,0,0,width,height);
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
  
  if(affichage.state == -1)
  {
    affichage.click_menu();
  }
}