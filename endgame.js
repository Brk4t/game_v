function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   3 = gagné + continue
   4 = modes
   5 = classement
   6 = menu
   7 = parametres
   */
  this.state = 6; // 0 pour partie en cours


  this.init = function()
  {

    //Boutons menu
    this.classement = new bouton();
    this.partie_rapide = new bouton();
    this.modes = new bouton();

    //Boutons gagne
    this.continuer = new bouton();

    //Boutons perdu
    this.menu = new bouton();
    this.restart = new bouton();

    this.menu2 = new bouton();
    this.parametres = new bouton();

    this.continuer.x1 = floor(width/2)-floor(width/3);
    this.continuer.y1 = 540;
    this.continuer.x2 = 640;
    this.continuer.y2 = 600;
    this.continuer.text ="Continuer à jouer";
    this.continuer.txt_size = 30;
    this.continuer.col_over =color(0, 200, 0);
    this.continuer.col = color(0, 150, 0);

    this.restart.x1 = floor(width/2)-floor(width/3);
    this.restart.y1 = 540;
    this.restart.x2 = 640;
    this.restart.y2 = 600;
    this.restart.text = "Nouvelle partie";
    this.restart.txt_size = 30;
    this.restart.col_over = color(200, 0, 0);
    this.restart.col = color(150, 0, 0);

    this.menu.x1 = floor(width/2)-floor(width/3);
    this.menu.y1 = 600;
    this.menu.x2 = floor(width/2)+floor(width/3);
    this.menu.y2 = 700;
    this.menu.text = "Menu";
    this.menu.txt_size = 30;
    this.menu.col_over = color(200, 0, 0);
    this.menu.col = color(150, 0, 0);
    this.menu.img_bool = true;
    this.menu.img = menu;
    this.menu.img_over = menu_over;

    this.menu2.x1 = floor(width/2)-floor(3*width/8);
    this.menu2.y1 = 20;
    this.menu2.x2 = floor(width/2)-floor(width/8);
    this.menu2.y2 = floor(height/10);
    this.menu2.text = "Menu";
    this.menu2.txt_size = 30;
    this.menu2.col_over = color(200, 0, 0);
    this.menu2.col = color(150, 0, 0);
    this.menu2.img_bool = true;
    this.menu2.img = menu;
    this.menu2.img_over = menu_over;

    this.parametres.x1 = floor(width/2)+floor(width/8);
    this.parametres.y1 = 20;
    this.parametres.x2 = floor(width/2)+floor(3*width/8);
    this.parametres.y2 = floor(height/10);
    this.parametres.text = "Menu";
    this.parametres.txt_size = 30;
    this.parametres.col_over = color(200, 0, 0);
    this.parametres.col = color(150, 0, 0);
    this.parametres.img_bool = true;
    this.parametres.img = menu;
    this.parametres.img_over = menu_over;

    this.partie_rapide.x1 = floor(width/2)-floor(width/3);
    this.partie_rapide.y1 = floor(2/5*height)-floor(height/15);
    this.partie_rapide.x2 = floor(width/2)+floor(width/3);
    this.partie_rapide.y2 = floor(2/5*height)+floor(height/15);
    this.partie_rapide.text = "Partie Rapide";
    this.partie_rapide.img_bool = true;
    this.partie_rapide.img = partie_rapide;
    this.partie_rapide.img_over = partie_rapide_over;

    this.modes.x1 = floor(width/2)-floor(width/3);
    this.modes.y1 = floor(3/5*height)-floor(height/15);
    this.modes.x2 = floor(width/2)+floor(width/3);
    this.modes.y2 = floor(3/5*height)+floor(height/15);
    this.modes.text = "Modes";
    this.modes.img_bool = true;
    this.modes.img = modes;
    this.modes.img_over = modes_over;

    this.classement.x1 = floor(width/2)-floor(width/3);
    this.classement.y1 = floor(4/5*height)-floor(height/15);
    this.classement.x2 = floor(width/2)+floor(width/3);
    this.classement.y2 = floor(4/5*height)+floor(height/15);
    this.classement.text = "Classement";
    this.classement.img_bool = true;
    this.classement.img = classement;
    this.classement.img_over = classement_over;
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
    if (this.state == 6)
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

    if (this.state == 0)
    {
      fill(150);
      rect(0, 0, width, floor(3*height/20));
      this.menu2.display();
      this.parametres.display();
    }
  } // Fin show

  this.click_gagne = function()
  {
    if (this.continuer.mouseon())
    {
      this.state =0;
    }    
    if (this.parametres.mouseon())
    {
      this.state =7;
    }
  }

  this.click_perdre = function()
  {
    console.log("click perdre state="+this.state);
    if (this.restart.mouseon()) // BOUTON REPLAY
    {
      grille = new Grid(sz, table_init);
      grille.init();
      this.state =0;
    }
    if (this.menu.mouseon()) // BOUTON MENU
    {
      this.state =6; // MENU
    }
    console.log("click perdre state="+this.state);
  }

  this.click_menu = function()
  {
    if (this.classement.mouseon())
    {
      this.click_classement();
    } else if (this.partie_rapide.mouseon())
    {
      this.click_partie_rapide();
    } else if (this.modes.mouseon())
    {
      this.click_modes();
    }
  }

  this.click_menu2= function()
  {
    if (this.menu2.mouseon())
    {
      grille.continuer = true;
      this.state = 6;
    }
  }
  this.click_partie_rapide = function()
  {
    if (!grille.continuer)
    {
      grille = new Grid(sz, table_init);
      grille.init();
    }
    this.state = 0;
  }

  this.click_modes = function()
  {
    this.state = 4;
  }

  this.click_classement = function()
  {
    this.state = 5;
  }

  this.display_menu = function()
  {
    background(color(10, 10, 40));

    this.partie_rapide.display();
    this.modes.display();
    this.classement.display();
  }
}