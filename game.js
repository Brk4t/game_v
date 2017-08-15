// GAME VERSION 1.0

var affichage;
var img;
var sz = 6;

var table_init;
var file = "init_grid.csv";


function setup() {
  createCanvas(840, 1000);


  affichage = new EndGame();

  console.log(table_init.getRowCount()+" rows.");
  console.log(table_init.getColumnCount()+" columns.");
  grille = new Grid(sz,table_init);
  grille.init();

  affichage = new EndGame();
  affichage.init();
}


function draw() {
  background((10, 10, 40));
  image(bckgrnd,0,0,width,height);
  if(affichage.state ==0)
  {
    grille.calculate();
  }
  grille.display();
  grille.mouseover();
  affichage.show();
}


function mouseClicked() 
{
  if(affichage.state ==0)
  {
    grille.click();
  }else if(affichage.state == 1)
  {
    affichage.click_gagne();
  }else if(affichage.state == 2)
  {
    affichage.click_perdre();
  }else if(affichage.state == 6)
  {
    affichage.click_menu();
  }
}
