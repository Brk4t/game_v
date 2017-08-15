
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
    if (this.y+this.vy<this.posy*this.size + floor(3*height/20))
    {
      this.vy = this.vy+this.ay;
      this.y = this.y+this.vy;
    } else { 
      this.y = this.posy*this.size+floor(3*height/20);
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