function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   3 = gagné + continue
   4 = modes
   5 = classement
   */
  this.state = 2; // 0 pour partie en cours

  //Boutons menu
  this.classement = new bouton();
  this.partie_rapide = new bouton();
  this.modes = new bouton();

  //Boutons gagne
  this.continuer = new bouton();

  //Boutons perdu
  this.menu = new bouton();
  this.restart = new bouton();

  this.init = function()
  {
    this.continuer.x1 = 220;
    this.continuer.y1 = 540;
    this.continuer.x2 = 640;
    this.continuer.y2 = 600;
    this.continuer.text ="Continuer à jouer";
    this.continuer.txt_size = 30;
    this.continuer.col_over =color(0, 200, 0);
    this.continuer.col = color(0, 150, 0);

    this.restart.x1 = 220;
    this.restart.y1 = 540;
    this.restart.x2 = 640;
    this.restart.y2 = 600;
    this.restart.text = "Nouvelle partie";
    this.restart.txt_size = 30;
    this.restart.col_over = color(200, 0, 0);
    this.restart.col = color(150, 0, 0);

    this.menu.x1 = 220;
    this.menu.y1 = 640;
    this.menu.x2 = 640;
    this.menu.y2 = 700;
    this.menu.text = "Menu";
    this.menu.txt_size = 30;
    this.menu.col_over = color(200, 0, 0);
    this.menu.col = color(150, 0, 0);
  }



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

    if (this.state == -1)
    {
      this.display_menu();
    }

    if (this.state == 1) // WIN
    {
      fill(0, 255, 0, 220); // BIG BOX BEHIND
      rect(120, 200, 600, 500);

      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, height/2-100);

      this.continuer.display();
      
    } else if (this.state == 2) // LOSE 
    {
      fill(255, 0, 0, 100); // BIG BOX BEHIND
      rect(120, 200, 600, 600);

      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);

      this.restart.display();
      this.menu.display();
      
    }

    if (this.state == 4)
    {
      background(150, 150, 150);
      text("MODES", width/2, 580);
    }

    if (this.state == 5)
    {
      background(150, 150, 150);
      text("CLASSEMENT", width/2, 580);
    }
  }

  this.click_gagne = function()
  {
    if (this.continuer.mouseon())
    {
      affichage.state =0;
    }
  }

  this.click_perdre = function()
  {       
    if (this.restart.mouseon()) // BOUTON REPLAY
    {
      grille = new Grid(sz);
      grille.init();
      affichage.state =0;
    }
    if (this.menu.mouseon()) // BOUTON MENU
    {
      affichage.state =-1; // MENU
    }
  }

  this.click_menu = function()
  {
    this.classement.click(this.click_classement);
    this.partie_rapide.click( this.click_partie_rapide);
    this.modes.click(this.click_modes);
  }


  this.click_partie_rapide = function()
  {
    grille = new Grid(sz,table_init);
    grille.init();
    affichage.state = 0;
  }

  this.click_modes = function()
  {
    affichage.state = 4;
  }

  this.click_classement = function()
  {
    affichage.state = 5;
  }

  this.display_menu = function()
  {
    background((10, 10, 40));

    // PARTIE RAPIDE
    this.partie_rapide.x1 = 220;
    this.partie_rapide.y1 = 300;
    this.partie_rapide.x2 = 640;
    this.partie_rapide.y2 = 400;
    this.partie_rapide.text = "Partie Rapide";

    this.partie_rapide.display();

    // MODES  
    this.modes.x1 = 220;
    this.modes.y1 = 500;
    this.modes.x2 = 640;
    this.modes.y2 = 600;
    this.modes.text = "Modes";

    this.modes.display();

    //CLASSEMENT
    this.classement.x1 = 220;
    this.classement.y1 = 700;
    this.classement.x2 = 640;
    this.classement.y2 = 800;
    this.classement.text = "Classement";

    this.classement.display();
  }
}
