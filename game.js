// GAME VERSION 1.0

var affichage;
var img;
function preload() {
  tile = Array(12);
  tile[2] = loadImage("img/tile_2.png");
  tile[3] = loadImage("img/tile_3.png");
  tile[4] = loadImage("img/tile_4.png");
  tile[5] = loadImage("img/tile_5.png");
  tile[6] = loadImage("img/tile_6.png");
  tile[7] = loadImage("img/tile_7.png");
  tile[8] = loadImage("img/tile_8.png");
  tile[9] = loadImage("img/tile_9.png");
  tile[10] = loadImage("img/tile_10.png");
  tile[11] = loadImage("img/tile_11.png");
  
  tile_over = Array(12);
  tile_over[2] = loadImage("img/tile_2_over.png");
  tile_over[3] = loadImage("img/tile_3_over.png");
  tile_over[4] = loadImage("img/tile_4_over.png");
  tile_over[5] = loadImage("img/tile_5_over.png");
  tile_over[6] = loadImage("img/tile_6_over.png");
  tile_over[7] = loadImage("img/tile_7_over.png");
  tile_over[8] = loadImage("img/tile_8_over.png");
  tile_over[9] = loadImage("img/tile_9_over.png");
  tile_over[10] = loadImage("img/tile_10_over.png");
  tile_over[11] = loadImage("img/tile_11_over.png");

  
}

function setup() {
  createCanvas(840, 1000);

  var sz = 6;
  grille = new Grid(sz);
  grille.init();
  var i = 0;
  while ( i< sz)
  {
    grille.brique_appear();
    i++
  }
  grille.calculate();
  grille.display();
  i = 0;
  while ( i< sz)
  {
    grille.brique_appear();
    i++
  }

  affichage = new EndGame();
}
function draw() {
  background((10, 10, 40));
  grille.calculate();
  grille.display();
  affichage.show();

  grille.mouseover();
}

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
          }
        }
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
  }//fin mouseover
} //fin grid

function brique(r, n) {
  this.posy = 0;
  this.posx = r;
  this.id = 0;
  this.n = n;
  this.size = floor(width/this.n);
  this.x = r*this.size;
  this.y = -this.size;
  this.vy = 0;
  this.ay = 0;
  this.value = 0;
  this.col = [color('#3AAACF'), 
    color('#FFB440'), 
    color('#FF6400'), 
    color('#024E68'), 
    color('#FFE400'), 
    color('#FFC873'), 
    color('#06799F'), 
    color('#A64100'), 
    color('#BF8730'), 
    color(20, 50, 150) ];
  this.can_evolve = true;


  this.move = function()
  {
    if (this.y+this.vy<this.posy*this.size)
    {
      this.vy = this.vy+this.ay;
      this.y = this.y+this.vy;
    } else { 
      this.y = this.posy*this.size;
      this.stop();
    }
  }

  this.display_over = function() 
  {
    tile_size = tile_over[2].width;
    image(tile_over[this.value], this.x, this.y, tile_size*this.size/tile_size, tile_size*this.size/tile_size)
/* sans images :
    fill(this.col[this.value-2], 100);
    strokeWeight(4);
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
    fill(0, 0, 0);
    textSize(80*7/this.n);
    strokeWeight(1);
    text(this.value, this.x+ this.size/2, this.y + 3*this.size/4);
    */
  }


  this.display = function() 
  {
    
    tile_size = tile[2].width;
    image(tile[this.value], this.x, this.y, tile_size*this.size/tile_size, tile_size*this.size/tile_size)
    
    /* sans image
    stroke(255);
      fill(this.col[this.value-2]);
      rect(this.x, this.y, this.size, this.size);
      fill(0, 0, 0);
      stroke(0);
      textSize(80*7/this.n);
      text(this.value, this.x+ this.size/2, this.y+3*this.size/4);
    } */
  }


  this.stop = function()
  {
    this.ay = 0;
    this.vy = 0;
  }

  this.fall = function()
  {
    this.ay =2;
    this.vy =1;
  }
}


function mouseClicked() 
{
  grille.click();
}

function EndGame()
{
  /* 0 = partie en cours
   1 = gagné
   2 = perdu
   */
  this.state = 0;

  this.gagner = function() {
    this.state = 1;
  }
  this.perdre = function() {
    this.state = 2;
  }
  this.show = function() {
    if (this.state == 1)
    {
      noStroke();
      fill(255);
      textSize(100);
      text("Gagné", width/2, height/2-100);
    } else if (this.state == 2) {
      noStroke();
      fill(255);
      textSize(100);
      text("Perdu", width/2, height/2-100);
    }
  }
}