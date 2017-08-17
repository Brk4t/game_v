function change_input()
{
  affichage.input.value("");
}


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
  this.state = 2; // 0 pour partie en cours
  this.display_submit = true;

  this.init = function()
  {
    this.load_bool = false;
    this.data_classement = [];

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

    this.parametres_menu = new bouton();
    this.info_menu = new bouton();

    this.continuer.x1 = floor(width/2)-floor(width/3);
    this.continuer.y1 = floor(height*7/16);
    this.continuer.x2 = floor(width/2)+floor(width/3);
    this.continuer.y2 = floor(height*8/16);
    this.continuer.text ="Continuer à jouer";
    this.continuer.txt_size = 30;
    this.continuer.col_over =color(0, 200, 0);
    this.continuer.col = color(0, 150, 0);

    this.restart.x1 = floor(width/2)-floor(width/3);
    this.restart.y1 = floor(height*9/16);
    this.restart.x2 = floor(width/2)+floor(width/3);
    this.restart.y2 = floor(height*9.8/16);
    this.restart.text = "Nouvelle partie";
    this.restart.txt_size = 30;
    this.restart.col_over = color(200, 0, 0);
    this.restart.col = color(150, 0, 0);

    this.menu.x1 = floor(width/2)-floor(width/3);
    this.menu.y1 = floor(height*10/16);
    this.menu.x2 = floor(width/2)+floor(width/3);
    this.menu.y2 = floor(height*11/16);
    this.menu.text = "Menu";
    this.menu.txt_size = 30;
    this.menu.col_over = color(200, 0, 0);
    this.menu.col = color(150, 0, 0);
    this.menu.img_bool = true;
    this.menu.img = menu;
    this.menu.img_over = menu_over;






    this.partie_rapide.x1 = floor(5*width/35);
    this.partie_rapide.y1 = floor(18*height/61);
    this.partie_rapide.x2 = floor(30*width/35);
    this.partie_rapide.y2 = floor(24*height/61);
    this.partie_rapide.text = "Partie Rapide";
    this.partie_rapide.img_bool = true;
    this.partie_rapide.img = partie_rapide;
    this.partie_rapide.img_over = partie_rapide_over;



    this.modes.x1 = floor(5*width/35);
    this.modes.y1 = floor(28*height/61);
    this.modes.x2 = floor(30*width/35);
    this.modes.y2 = floor(34*height/61);
    this.modes.text = "Modes";
    this.modes.img_bool = true;
    this.modes.img = modes;
    this.modes.img_over = modes_over;

    this.classement.x1 = floor(5*width/35);
    this.classement.y1 = floor(38*height/61);
    this.classement.x2 = floor(30*width/35);
    this.classement.y2 = floor(44*height/61);
    this.classement.text = "Classement";
    this.classement.img_bool = true;
    this.classement.img = classement;
    this.classement.img_over = classement_over;

    this.parametres_menu.x1 = floor(21*width/35);
    this.parametres_menu.y1 = floor(48*height/61);
    this.parametres_menu.x2 = floor(27*width/35);
    this.parametres_menu.y2 = floor(54*height/61);
    this.parametres_menu.img_bool = true;
    this.parametres_menu.img = parametres;
    this.parametres_menu.img_over = parametres_over;

    this.info_menu.x1 = floor(7*width/35);
    this.info_menu.y1 = floor(48*height/61);
    this.info_menu.x2 = floor(13*width/35);
    this.info_menu.y2 = floor(54*height/61);
    this.info_menu.img_bool = true;
    this.info_menu.img = information;
    this.info_menu.img_over = information_over;


    this.menu2.x1 = floor(3.25*width/35);
    this.menu2.y1 = floor(2.25*height/61);
    this.menu2.x2 = floor(8.25*width/35);
    this.menu2.y2 = floor(7.25*height/61);
    this.menu2.txt_size = 30;
    this.menu2.col_over = color(200, 0, 0);
    this.menu2.col = color(150, 0, 0);
    this.menu2.img_bool = true;
    this.menu2.img = retour;
    this.menu2.img_over = retour_over;

    this.info_game = new bouton();
    this.info_game.x1 = floor(26*width/35);
    this.info_game.y1 = floor(2*height/61);
    this.info_game.x2 = floor(31.5*width/35);
    this.info_game.y2 = floor(7.5*height/61);
    this.info_game.img_bool = true;
    this.info_game.img = information;
    this.info_game.img_over = information_over;

    this.parametres.x1 = floor(14.5*width/35);
    this.parametres.y1 = floor(2*height/61);
    this.parametres.x2 = floor(20*width/35);
    this.parametres.y2 = floor(7.5*height/61);
    this.parametres.img_bool = true;
    this.parametres.img = parametres;
    this.parametres.img_over = parametres_over;

    this.input = createInput();
    this.input.position(floor(width/2)-floor(width/3), floor(height*6.5/16));
    this.input.parent("container_game");
    
    this.input.value("Pseudo");
    this.input.style("width", floor(2*width/3)+"px");
    this.input.style("height", floor(height/16)+"px");
    this.input.style("font-size", floor(height/28)+"px");
    this.input.touchStarted(change_input);
    this.input.hide();


    this.b = createButton('Envoyer');
    this.b.position(floor(width/4), this.input.y+this.input.height + 10);
    this.b.parent("container_game");
    this.b.style("width", floor(width/2)+"px");
    this.b.style("height", floor(height/16)+"px");
    this.b.style("font-size", floor(height/28)+"px");
    this.b.mousePressed(send);
    this.b.hide();
  }


  this.gagner = function() {
    if (this.state == 0)
    {
      this.state = 1;
    }
  }

  this.perdre = function() {
    this.state = 2;
    this.display_submit = true;
  }




  this.show = function() {
    if (this.state == 6)
    {

      flag = 0;
      this.display_menu();
    }

    if (this.state == 1) // WIN
    {
      fill(0, 255, 0, 220); // BIG BOX BEHIND
      rect(width/10, height/6, 8*width/10, 3*height/6);

      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, floor(height*5/16));

      this.continuer.display();
    }
    if (this.state == 2) // LOSE 
    {
      fill(255, 0, 0, 100); // BIG BOX BEHIND
      rect(width/10, height/6, 8*width/10, 3.5*height/6);

      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, floor(height*5/16));
      if (this.display_submit)
      { 
        this.input.show();
        this.b.show();
      } else
      {
        this.input.hide();
        this.b.hide();
      }
      this.restart.display();
      this.menu.display();
    } else {
      this.input.hide();
      this.b.hide();
    }

    if (this.state == 4)
    {
      background(150, 150, 150);
      text("MODES", width/2, 580);
    }

    if (this.state == 5)
    {
      if (!this.load_bool)
      {
        this.load_bool = true;
        charger();
      }

      background(150, 150, 150);

      text("CLASSEMENT", width/2, height/6);
      text("Rang", width/6, height/3 - height/15)
        text("Pseudo", 3*width/6, height/3 - height/15);
      text("Score", 5*width/6, height/3 - height/15)
        //text("Date", 5*width/6,height/3 - height/15)
        for (var i =0; i<this.data_classement.length; i++)
      {
        row = this.data_classement[i];

        text("#" + (i+1), width/6, height*i/15 + height/3)
          text(row.pseudo, 3*width/6, height*i/15+ height/3)
          text(row.score, 5*width/6, height*i/15 + height/3)
          //text(row.date, 5*width/6,height*i/15+ height/3)
      }
      this.menu2.display();
    } else
    {
      this.load_bool = false;
    }

    if (this.state == 0 || this.state == 1 || this.state == 2 || this.state == 3)
    {
      this.info_game.display();
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
      charger();
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
    this.load_bool = false;
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
    image(background_menu, 0, 0, width, height);
    this.info_menu.display();
    this.parametres_menu.display();
    this.partie_rapide.display();
    this.modes.display();
    this.classement.display();
  }
}