
// original image, to use as reference for pixel colors
let oImg;

// display image, to modify and display on canvas
let mImg;

let mGif;

let rSlider;
let gSlider;
let bSlider;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
  mGif = loadImage("./09A_frames/F_1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);
  mGif.resize(0, 330);

  // we'll read pixel color info from the oImg, so let's load its pixels
  oImg.loadPixels();
  mImg.loadPixels();
  mGif.loadPixels();

  // TODO: setup sliders and other DOM/html elements here
 rSlider = createSlider(0, 255, 128);
 rSlider.position(130, 140);

 gSlider = createSlider(0, 255, 128);
 gSlider.position(130, 160);

 bSlider = createSlider(0, 255, 128);
 bSlider.position(130, 180);
}

function draw() {
  // we'll modify and display the mImg object, so let's load its pixels
  mImg.loadPixels();

  // TODO: do any filtering and pixel modifications here.
  //       This involves a for loop of some kind.
  //       Remember to read from the oImg pixels and write to the mImg.
  let rAmount = rSlider.value();
  let gAmount = gSlider.value();
  let bAmount = bSlider.value();

  rSlider.style('width', '150px');
  rSlider.style('height', '3px');

  gSlider.style('width', '150px');
  gSlider.style('height', '3px');

  bSlider.style('width', '150px');
  bSlider.style('height', '3px');


  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {
    let redVal = oImg.pixels[idx + 0];
    let greenVal = oImg.pixels[idx + 1];
    let blueVal = oImg.pixels[idx + 2];
    let alphaVal = oImg.pixels[idx + 3];

    let pixelIsRed = redVal > 2 * greenVal && redVal > 2 * blueVal && redVal > 200;
    let pixelIsBlue = blueVal > 2 * redVal && blueVal > 1 * greenVal && blueVal > 1;
    let pixelisYellow = redVal > 1 * greenVal && redVal > 2 * blueVal && redVal > 200;

    
    //FOR RED SECTIONS
    if (pixelIsRed) {
      mImg.pixels[idx + 0] = rAmount;
      mImg.pixels[idx + 1] = gAmount;
      mImg.pixels[idx + 2] = bAmount;
      mImg.pixels[idx + 3] = alphaVal;
    }
    //FOR BLUE SECTIONS
    else if (pixelIsBlue) {
      mImg.pixels[idx + 0] = 0;
      mImg.pixels[idx + 1] = 255;
      mImg.pixels[idx + 2] = 0;
      mImg.pixels[idx + 3] = alphaVal;
    }
    //FOR YELLOW SECTIONS
    else if (pixelisYellow) {
      mImg.pixels[idx + 0] = 0; 
      mImg.pixels[idx + 1] = 0;
      mImg.pixels[idx + 2] = 0;
      mImg.pixels[idx + 3] = 0;
    }
    // for all other pixels: keep original colors
    else {
      mImg.pixels[idx + 0] = redVal;
      mImg.pixels[idx + 1] = greenVal;
      mImg.pixels[idx + 2] = blueVal;
      mImg.pixels[idx + 3] = alphaVal;
    }
  }

  mImg.updatePixels();

  image(oImg, 0, 0);
  image(mGif, 300, 0)
  image(mGif, 0, 500)
  image(mImg, 0, 0);
 

  fill(255);
  textSize(14);
  text("Red Amount: " + rAmount, 290, 148);
  text("Green Amount: " + gAmount, 290, 168);
  text("Blue Amount: " + bAmount, 290, 188);
}
