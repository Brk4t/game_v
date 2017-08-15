function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   3 = gagné + continue
   4 = modes
   5 = classement
   */
  this.state = -1; // 0 pour partie en cours

  //Boutons
  this.classement = new bouton();
  this.partie_rapide = new bouton();
  this.modes = new bouton();



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

      if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
      {        
        // DRAW BUTTON
        fill(color(0, 200, 0, 0.1));
        rect(220, 540, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Continuer à jouer", width/2, 580);
      } else
      {
        //DRAW BUTTON
        fill(color(0, 150, 0));
        rect(220, 540, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Continuer à jouer", width/2, 580);
      }
    } else if (this.state == 2) // LOSE 
    {
      fill(255, 0, 0, 220); // BIG BOX BEHIND
      rect(120, 200, 600, 600);

      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);

      if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60) // BOUTON NOUVELLE PARTIE
      {        
        // DRAW BUTTON
        fill(color(200, 0, 0));
        rect(220, 540, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Nouvelle partie", width/2, 580);
      } else
      {
        //DRAW BUTTON
        fill(color(150, 0, 0));
        rect(220, 540, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Nouvelle partie", width/2, 580);
      }

      if (mouseX > 220 && mouseY > 640 && mouseX <220+420 && mouseY < 640+60) // BOUTON MENU
      {        
        // DRAW BUTTON
        fill(color(200, 0, 0));
        rect(220, 640, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Menu", width/2, 680);
      } else
      {
        //DRAW BUTTON
        fill(color(150, 0, 0));
        rect(220, 640, 420, 60);

        //DRAW WRITING
        textSize(30);
        fill(0);
        text("Menu", width/2, 680);
      }
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
    if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
    {
      affichage.state =0;
    }
  }

  this.click_perdre = function()
  {       
    if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60) // BOUTON REPLAY
    {
      grille = new Grid(sz);
      grille.init();
      affichage.state =0;
    }
    if (mouseX > 220 && mouseY > 640 && mouseX <220+420 && mouseY < 640+60) // BOUTON MENU
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
    grille = new Grid(sz);
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