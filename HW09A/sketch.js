
// original image, to use as reference for pixel colors
let oImg;

// display image, to modify and display on canvas
let mImg;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);

  // we'll read pixel color info from the oImg, so let's load its pixels
  oImg.loadPixels();
  mImg.loadPixels();
  // TODO: setup sliders and other DOM/html elements here
}

function draw() {
  // we'll modify and display the mImg object, so let's load its pixels
  mImg.loadPixels();

  // TODO: do any filtering and pixel modifications here.
  //       This involves a for loop of some kind.
  //       Remember to read from the oImg pixels and write to the mImg.

  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {
    let redVal = oImg.pixels[idx + 0];
    let greenVal = oImg.pixels[idx + 1];
    let blueVal = oImg.pixels[idx + 2];
    let alphaVal = oImg.pixels[idx + 3];

    let pixelIsRed = redVal > 2 * greenVal && redVal > 2 * blueVal && redVal > 1;
    let pixelIsBlue = blueVal > 2 * redVal && blueVal > 1 * greenVal && blueVal > 1;
    let pixelisYellow = redVal > 1 * greenVal && redVal > 2 * blueVal && redVal > 200;

    
    //FOR RED SECTIONS
    if (pixelIsRed) {
      mImg.pixels[idx + 0] = 0;   // Red channel (set to 0)
      mImg.pixels[idx + 1] = 0;   // Green channel (set to 0)
      mImg.pixels[idx + 2] = 255; // Blue channel (set to 255)
      mImg.pixels[idx + 3] = alphaVal;  // Keep original alpha
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
      mImg.pixels[idx + 2] = 100;
      mImg.pixels[idx + 3] = alphaVal;
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
  image(mImg, 0, 0);
}
