// GAME VERSION 1.0
var w = screen.width;
var h = screen.height;

var affichage;
var img;
var sz = 6;

var table_init = 0;
var file = "init_grid.csv";


function setup() {
  var canvas = createCanvas(min(w,840), h-5);
  print(w);
  print(width);
  print(h);
  print(height);
  canvas.parent('container_game');  
  
  affichage = new EndGame();
  affichage.init();
  
  grille = new Grid(sz,table_init);
  grille.init();


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
    affichage.click_menu2();
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