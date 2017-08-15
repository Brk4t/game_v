
function Grid(sz) {
  this.n = sz;
  this.cell_w = floor(width/this.n);
  this.cell_h = floor(width/this.n);
  this.x_to_pix =[];
  this.y_to_pix =[];
  this.content = Array(this.n).fill(0).map(x => Array(this.n).fill(null));
  this.id = 0;
  this.mat = Array(this.n).fill(0).map(x => Array(this.n).fill(0));
  this.score = 0;


  this.init = function() {
    for (var i =0; i<this.n+2; i++)
    {
      this.x_to_pix[i] = floor(this.cell_w*i);
      this.y_to_pix[i] = floor(this.cell_h*i);
    }
    var i = 0;
    while ( i< sz)
    {
      this.brique_appear();
      i++
    }
    this.calculate();
    this.display();
    i = 0;
    while ( i< sz)
    {
      this.brique_appear();
      i++
    }
  }

  this.calculate = function()
  {
    for (var j =0; j<this.n; j++)
    {
      for (var i=0; i<this.n; i++)
      {
        if (this.content[i][j] != null)
        {
          this.content[i][j].move();
          k=j;
          while (k < this.n-1 && this.content[i][k+1] == null ) //on calcule la position de la brique si elle peut tomber
          {
            this.content[i][k].fall();
            this.content[i][k+1] = this.content[i][k];
            this.content[i][k+1].posy = k+1;
            this.content[i][k] = null;
            k++;
          }
        }
      }
    }

    var flag = false;
    for (var j =0; j<this.n; j++)
    {
      for (var i=0; i<this.n; i++)
      {
        if (grille.content[i][j] != null)
        {
          brk = grille.content[i][j];
          var l = grille.colles(brk);
          if (l.length >= brk.value)
          {
            flag = true;
            to_evolve = brk;
            break;
          }
        }
      }
      if (flag) {
        break;
      }
    }
    // fin parcours de boucle
    if (!flag)
    {
      affichage.perdre();
    }
  }

  this.display = function()
  {
    strokeWeight(1);
    stroke(255); //WHAT IS STROKE ?
    for (var i =0; i<this.n+1; i++)
    {
      line(this.x_to_pix[0], this.y_to_pix[i], this.x_to_pix[this.n+1], this.y_to_pix[i]);
    }
    for (var i =0; i<this.n+1; i++)
    {
      line(this.x_to_pix[i], this.y_to_pix[0], this.x_to_pix[i], this.y_to_pix[this.n]);
    }

    for (var j =0; j<this.n; j++)
    {
      for (var i=0; i<this.n; i++)
      {
        if (this.content[i][j] != null)
        {
          this.content[i][j].display(); // on affiche la brique
        }
      }
    }
    //Affiche score:
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(36);
    text("Score : " + this.score, 420, 950);
  }

  this.brique_appear = function()
  {
    test= false;
    for (i =0; i < this.n; i++)
    {
      test = ((this.content[i][0] == null) || test);   // test si la premiere ligne est pleine si oui perdu lol sinon on fait apparaitre
    }
    print(test);

    var rand6 = floor(random(0, this.n));

    while (this.content[rand6][0] != null && test)
    {
      rand6 = floor(random(0, this.n));
    }
    if (test)
    {
      brk = new brique(rand6, this.n);
      brk.value = floor(random(2, 4));
      brk.posx = rand6;
      brk.fall();

      this.id++;
      this.content[rand6][0] = brk;
    }
  }

  this.click = function() 
  {
    var flag = false
      for (var j =0; j<this.n; j++)
    {
      for (var i=0; i<this.n; i++)
      {
        if (grille.content[i][j] != null)
        {
          brk = grille.content[i][j];
          if (mouseX > brk.x && mouseY > brk.y && mouseX <brk.x+brk.size && mouseY < brk.y + brk.size)
          {
            var l = grille.colles(brk);
            if (l.length >= brk.value)
            {
              flag = true;
              to_evolve = brk;
            }
          }
        }
      }
    } // fin parcours de boucle
    if (flag) {
      this.score = this.score + l[0].value*l[0].value;
      grille.evolve(l);
      // generation nouvelles briques
      lo = max(this.n - 6, 1);
      hi = this.n - 2; 
      var nw = floor(random(lo, hi));
      var i = 0;
      while (i < nw)
      {
        i++;
        grille.brique_appear();
      }
      flag = false;
    }
  }

  this.voisin = function(brk) 
  {
    var lst = []

      //haut
      if (brk.posy != 0 && this.content[brk.posx][brk.posy-1] != null && this.content[brk.posx][brk.posy-1].value == brk.value )
    {
      append(lst, this.content[brk.posx][brk.posy-1])
    }
    //droite
    if (brk.posx != this.n-1 && this.content[brk.posx+1][brk.posy] != null && this.content[brk.posx+1][brk.posy].value == brk.value)
    {
      append(lst, this.content[brk.posx+1][brk.posy]);
    }
    //bas
    if (brk.posy != this.n -1 && this.content[brk.posx][brk.posy+1] != null && this.content[brk.posx][brk.posy+1].value == brk.value)
    {
      append(lst, this.content[brk.posx][brk.posy+1])
    }
    //gauche
    if (brk.posx != 0 && this.content[brk.posx-1][brk.posy] != null && this.content[brk.posx-1][brk.posy].value == brk.value)
    {
      append(lst, this.content[brk.posx-1][brk.posy]);
    }
    return lst;
  }


  this.colles = function(brk)
  {
    lst = [];
    suivants = [brk];
    while (suivants.length > 0)
    {
      c = suivants[0];
      suivants.splice(0, 1);
      if (this.mat[c.posx][c.posy] == 0)
      {
        this.mat[c.posx][c.posy] = 1;
        voisins = this.voisin(c);
        for (var i =0; i<voisins.length; i++)
        {
          if (this.mat[voisins[i].posx][voisins[i].posy] == 0)
          {
            append(suivants, voisins[i]);
          }
        }
        append(lst, c);
      }
    }

    //RESET FLAG
    for (var i=0; i<this.n; i++)
    {
      for (var j=0; j<this.n; j++)
      {
        this.mat[i][j] = 0;
      }
    }
    return lst;
  }

  this.evolve =function(l) {
    k = l[0];
    if (k.value < 9)
    {
      k.value +=1; //increase value of the clicked tile
    }
    if (k.value == this.n+1)
    {
      affichage.gagner();
    }
    l.splice(0, 1); // getting rid of the clicked tile

    j=1;
    while (l.length >0 && j < k.value-1) // getting rid of the other tiles of the list
    {
      elem = l[0];
      l.splice(0, 1);
      this.content[elem.posx][elem.posy] = null;
      j++;
    }
  }

  this.mouseover = function()
  {
    if (affichage.state ==0)
    {
      var flag = false;
      for (var j =0; j<this.n; j++)
      {
        for (var i=0; i<this.n; i++)
        {
          if (grille.content[i][j] != null)
          {
            brk = grille.content[i][j];
            if (mouseX > brk.x && mouseY > brk.y && mouseX <brk.x+brk.size && mouseY < brk.y + brk.size)
            {
              var l = grille.colles(brk);
              if (l.length >= brk.value) // possibilité de casser
              {
                flag = true;
                to_hover = l;
              }
            }
          }
        }
      } // fin parcours de boucle

      if (flag)
      {
        var k = 0;
        while (to_hover.length > 0 && k <to_hover[0].value)
        {
          brk = to_hover[0];
          to_hover.splice(0, 1);
          brk.display_over();
          k++;
        }
        flag = false;
      }
    }//fin if state partie en cours
  }//fin mouseover
} //fin grid