
function brique(r, n) {
  this.posy = 0;
  this.posx = r;
  this.id = 0;
  this.n = n;
  this.size = floor(30.5*width/35/this.n);
  this.x = r*this.size+2.35*width/35;
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
  this.ground = floor(16.5*height/61);
  
  this.move = function()
  {
    if (this.y+this.vy<this.posy*this.size+this.ground )
    {
      print(this.posy*this.size+this.ground);
      this.vy = this.vy+this.ay;
      this.y = this.y+this.vy;
    } else { 
      this.y = this.posy*this.size+this.ground;
      this.stop();
    }
  }

  this.display_over = function() 
  {
    tile_size = tile_over[2].width;
    image(tile_over[this.value], this.x, this.y, tile_size*this.size/tile_size, tile_size*this.size/tile_size)
  }


  this.display = function() 
  {

    tile_size = tile[2].width;
    image(tile[this.value], this.x, this.y, tile_size*this.size/tile_size, tile_size*this.size/tile_size)
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