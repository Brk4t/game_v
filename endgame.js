function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   3 = gagné + continue
   */
  this.state = 2; // 0 pour partie en cours

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
    if (this.state == 1) // WIN
    {
      fill(0, 255, 0,220); // BIG BOX BEHIND
      rect(120, 200, 600, 500);
      
      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, height/2-100);

      if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
      {        
        // DRAW BUTTON
        fill(color(0, 200, 0,0.1));
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
      fill(255, 0, 0,220); // BIG BOX BEHIND
      rect(120, 200, 600, 500);

      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);

      if (mouseX > 220 && mouseY > 540 && mouseX <220+420 && mouseY < 540+60)
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
    grille = new Grid(sz);
    grille.init();
    affichage.state =0;
  }
}