function bouton()
{
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;

  this.h = this.y2-this.y1;
  this.w = this.x2-this.x1;

  this.text = "";
  this.col = color(150, 150, 150);
  this.col_over= color(200, 200, 200);

  this.txt_col = 0;
  this.txt_size = 60;

  this.display = function()
  {
    if (mouseX > this.x1 && mouseY > this.y1 && mouseX <this.x2  && mouseY < this.y2)
    {
      //BOX
      fill(this.col_over);
      rect(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1); 

      //TEXT
      fill(color(this.txt_col));
      textSize(this.txt_size);
      textAlign(CENTER, CENTER);
      this.h = this.y2-this.y1;
      this.w = this.x2-this.x1;
      text(this.text, this.x1 + this.w/2, this.y1+this.h/2 );
    } else
    {
      //BOX
      fill(this.col);
      rect(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1); 

      //TEXT
      fill(color(this.txt_col));
      textSize(this.txt_size);
      textAlign(CENTER, CENTER);
      this.h = this.y2-this.y1;
      this.w = this.x2-this.x1;
      text(this.text, this.x1 + this.w/2, this.y1+this.h/2 );
    }
  }

  this.click =function(fct)
  {
    if (mouseX > this.x1 && mouseY > this.y1 && mouseX <this.x2  && mouseY < this.y2)
    {
      fct();
    }
  }
}