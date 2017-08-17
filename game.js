// GAME VERSION 1.0

var w = $(window).width();
var h = $(window).height() == 0 ? window.innerHeight : $(window).height();

var test1;
var test2;
var test3;

var affichage;
var img;
var sz = 6;

var table_init = 0;
var file = "init_grid.csv";

function setup() {
  //var canvas = createCanvas(min(w,750*2), min(h,1334*2)-5);
  
  //FORCER LE RAPPORT :
  if(h/w > 1715/980) // H > W on dit que W est limitant
  {
    h=w*1715/980;
  }else
  {
    w = h*980/1715;
  }
  
  


  document.getElementById('container_game').style.width = w ;
  document.getElementById('container_game').style.height = h ;
  
  var canvas = createCanvas(w, h);
  print(w);
  print(width);
  print(h);
  print(height);
  canvas.parent('container_game');  
  
  affichage = new EndGame();
  affichage.init();
  
  affichage.input.parent('container_game');
  
  grille = new Grid(sz,table_init);
  grille.init();
}


function draw() {
  background((10, 10, 40));
  
  if(affichage.state ==0)
  {
    grille.calculate();
  }
  grille.display();
  grille.mouseover();
  affichage.show();
}


function mouseClicked() 
{
  if(affichage.state ==0)
  {
    grille.click();
    affichage.click_menu2();
  }else if(affichage.state == 1)
  {
    affichage.click_gagne();
  }else if(affichage.state == 2)
  {
    affichage.click_perdre();
  }else if(affichage.state == 6)
  {
    affichage.click_menu();
  }else if(affichage.state == 5)
	
	  {
		  affichage.click_menu2();
	  }
}

 function send()
 {
  $.ajax( {
  url: "save_score.php", 
  type: 'GET', 
  data: "score="+grille.score +"&pseudo=" + affichage.input.value(), 
  success: function(code_html, statut) { 
  affichage.display_submit = false;
 }
}
)
 }
 
 function charger()
 {
	 var to_return =[];
	 $.ajax( {
		  url: "read_score.php", 
		  type: 'POST', 
		  data: "",
		  dataType: 'json',
		  success: function(data) {
			affichage.data_classement = JSON.parse(data);
  },
         error : function(resultat, statut, erreur){
			 print("error")

       }
})
 }
 
 