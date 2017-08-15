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
      fill(255, 0, 0, 100); // BIG BOX BEHIND
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
    if (mouseX > 220 && mouseY > 300 && mouseX <220+420 && mouseY < 400) // CLICK PARTIE RAPIDE
    {
      this.click_partie_rapide();
    } else if (mouseX > 220 && mouseY > 500 && mouseX <640 && mouseY < 600) // CLICK MODES
    {
      this.click_modes();
    } else if (mouseX > 220 && mouseY > 700 && mouseX <220+420 && mouseY <800) // CLICK CLASSEMENT
    {
      this.click_classement();
    }
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
    if (mouseX > 220 && mouseY > 300 && mouseX <220+420 && mouseY < 400)
    {
      //DRAW BUTTON
      fill(color(200, 200, 200));
      rect(220, 300, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Partie rapide", width/2, 365);
    } else
    {
      //DRAW BUTTON
      fill(color(150, 150, 150));
      rect(220, 300, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Partie rapide", width/2, 365);
    }
    // MODES
    if (mouseX > 220 && mouseY > 500 && mouseX <640 && mouseY < 600)
    {
      //DRAW BUTTON
      fill(color(200, 200, 200));
      rect(220, 500, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Modes de jeu", width/2, 565);
    } else {
      //DRAW BUTTON
      fill(color(150, 150, 150));
      rect(220, 500, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Modes de jeu", width/2, 565);
    }

    //CLASSEMENT
    if (mouseX > 220 && mouseY > 700 && mouseX <220+420 && mouseY <800)
    {
      //DRAW BUTTON
      fill(color(200, 200, 200));
      rect(220, 700, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Classement", width/2, 765);
    } else
    {
      //DRAW BUTTON
      fill(color(150, 150, 150));
      rect(220, 700, 420, 100);
      //DRAW WRITING
      textSize(50);
      fill(0);
      text("Classement", width/2, 765);
    }
  }
}
