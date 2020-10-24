//costanti
let myImage;
let mySong;
let myRain = [];
let myText;


function preload(){
  // put preload code here
  //immagine
myImage = loadImage("./assets/images/image.jpg");

//suono
mySong = loadSound("./assets/sounds/rainsound.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  ellipseMode(RADIUS);

//suono
analyzer = new p5.Amplitude();
analyzer.setInput(mySong);

}

function draw() {
  // put drawing code here
  //immagine
imageMode(CENTER)
image(myImage, windowWidth/2, windowHeight/2, myImage.width/1.5, myImage.height/1.5);

//suono
let volume = 0;
volume = analyzer.getLevel();
volume = map(volume, 0, 1, 0, 200);

//pioggia
  if (myRain.length < 200) myRain.push(new Rain());
  for (var i = 0; i < myRain.length; i++) {
    myRain[i].update();
    myRain[i].display();
  }

//testo
let myText = "Click and enjoy the rain";

fill(color("black"));
textSize(25);
textStyle(ITALIC)
textFont("Roboto");
textAlign(CENTER);
text(myText, width/2, 100);
}


//play e pausa pioggia
function mouseClicked(){
if(mySong.isPlaying() == false){
  mySong.play();
} else {
  mySong.stop();
}
}


//classe pioggia
class Rain {

  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(width);
    this.y = random(-100, 0);
    this.vy = 12;
    this.maxy = this.y + height;
    this.r = 0;
    this.tr = 1;
  }
  update() {
    if (this.y < this.maxy) {
      this.y += this.vy;
    } else {
      this.r++;
    }
    if (this.r > this.tr) this.reset();
  }
  display() {

     if(mySong.isPlaying() == false){
       stroke(255,255,255,0);
       noFill();
     } else {
       stroke(0,0,0);
       noFill();
     }

     push();
     translate(this.x,this.y);
     beginShape();
     strokeWeight(2);
     vertex(0,-5);
     quadraticVertex(9, 0, 0, 4);
     quadraticVertex(-9,0, 0, -15);
     endShape(CLOSE);
     pop();
  }
}
