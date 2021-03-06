
function Grid(sz,tab) {
  this.n = sz;
  this.cell_w = floor(width/this.n);
  this.cell_h = floor(width/this.n);
  this.x_to_pix =[];
  this.y_to_pix =[];
  this.content = Array(this.n).fill(0).map(x => Array(this.n).fill(null));
  this.id = 0;
  this.mat = Array(this.n).fill(0).map(x => Array(this.n).fill(0));
  this.score = 0;
  this.initial_grid = tab;
  this.lost = true;
  this.tab_score = Array(11);
  
  this.init = function() {
    for (var i =0; i<this.n+2; i++)
    {
      this.x_to_pix[i] = floor(this.cell_w*i);
      this.y_to_pix[i] = floor(this.cell_h*i);
    }
    
    this.tab_score[2] = 4;
    this.tab_score[3] = 27;
    this.tab_score[4] = 256;
    this.tab_score[5] = 3125;
    this.tab_score[6] = 46656;
    this.tab_score[7] = 823543;
    this.tab_score[8] = 16777216;
    
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
    for(var i =0; i< this.n;i++)
    {
      this.content[i][0].y = -2*this.content[i][0].size;
    }
    //this.load();
  }

  this.load = function() {
    for (var i=this.n-1; i>=0; i--)
    {
        for (var j=0; j<this.n; j++)
        {
            if (this.initial_grid.get(i,j) != "x")
            {
                this.content[j][i] = new brique(j,this.n);
                this.content[j][i].value = parseInt(this.initial_grid.get(i,j));
                this.content[j][i].posy = i;
                this.content[j][i].y = -this.content[j][i].size*(this.n+1-i);
                this.content[j][i].fall();
            } else {
                this.content[j][i] = null;
            }
        }
    }
 }

  this.calculate = function()
  {
    for (var j=6; j>=0; j--)
    {
      for (var i=0; i<this.n; i++)
      {
        if (this.content[i][j] != null)
        {
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
	  this.lost = true;
      affichage.perdre();
    }
  }

  this.display = function()
  {
    strokeWeight(1);
    stroke(255); 
    background(255);
    for (var j =0; j<this.n; j++)
    {
      for (var i=0; i<this.n; i++)
      {
        if (this.content[i][j] != null)
        {
          this.content[i][j].move();
          this.content[i][j].display(); // on affiche la brique
        }
      }
    }
    
    image(bckgrnd,0,0,width,height);
    //Affiche score:
    strokeWeight(0);
    fill(255,255, 255);
    textAlign(LEFT);
    textSize(30);
    text(this.score, width/2, 13.8*height/61);
  }

  this.brique_appear = function()
  {
    test= false;
    for (i =0; i < this.n; i++)
    {
      test = ((this.content[i][0] == null) || test);   // test si la premiere ligne est pleine si oui perdu lol sinon on fait apparaitre
    }

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
      this.score = this.score + this.tab_score[l[0].value];
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