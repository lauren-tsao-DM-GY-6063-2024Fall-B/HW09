// Original image, to use as reference for pixel colors
let oImg;

// Display image, to modify and display on canvas
let mImg;

let mGif = [];

let rSlider;
let gSlider;
let bSlider;
let GifSlider;

let colorPicker;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
  
  for (let i = 0; i <= 47; i++) {
    mGif.push(loadImage(`./09A_frames/F_${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);

  colorPicker = createColorPicker('#003f7c');
  colorPicker.position(200, 212);

  // Resize images in mGif array
  for (let i = 0; i < mGif.length; i++) {
    mGif[i].resize(0, 330);
  }

  // Load pixels after resizing images
  oImg.loadPixels();
  mImg.loadPixels();

  // Setup sliders
  rSlider = createSlider(0, 255, 253);
  rSlider.position(100, 140);

  gSlider = createSlider(0, 255, 67);
  gSlider.position(100, 160);

  bSlider = createSlider(0, 255, 42);
  bSlider.position(100, 180);

  GifSlider = createSlider(0, 45, 0);
  GifSlider.position(100, 270);

  // Set slider styles once in setup
  rSlider.style('width', '150px');
  rSlider.style('height', '3px');

  gSlider.style('width', '150px');
  gSlider.style('height', '3px');

  bSlider.style('width', '150px');
  bSlider.style('height', '3px');

  GifSlider.style('width', '150px');
  GifSlider.style('height', '2px');
}

function draw() {
  // Modify mImg pixels
  mImg.loadPixels();

  let pickedColor = colorPicker.color();  // get the picked color
  let pickedR = red(pickedColor);         // extract red component
  let pickedG = green(pickedColor);       // extract green component
  let pickedB = blue(pickedColor);

  // Get slider values
  let rAmount = rSlider.value();
  let gAmount = gSlider.value();
  let bAmount = bSlider.value();
  let GifFrame = GifSlider.value();

  // Iterate through pixels of oImg and modify mImg
  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {
    let redVal = oImg.pixels[idx + 0];
    let greenVal = oImg.pixels[idx + 1];
    let blueVal = oImg.pixels[idx + 2];
    let alphaVal = oImg.pixels[idx + 3];

    let pixelIsRed = redVal > 2 * greenVal && redVal > 2 * blueVal && redVal > 200;
    let pixelIsBlue = blueVal > 2 * redVal && blueVal > 1 * greenVal && blueVal > 1;
    let pixelIsYellow = redVal > 1 * greenVal && redVal > 2 * blueVal && redVal > 200;

    // Modify pixel colors based on conditions
    if (pixelIsRed) {
      mImg.pixels[idx + 0] = rAmount;
      mImg.pixels[idx + 1] = gAmount;
      mImg.pixels[idx + 2] = bAmount;
      mImg.pixels[idx + 3] = alphaVal;
    }
    else if (pixelIsBlue) {
      mImg.pixels[idx + 0] = pickedR;
      mImg.pixels[idx + 1] = pickedG;
      mImg.pixels[idx + 2] = pickedB;
      mImg.pixels[idx + 3] = alphaVal;
    }
    else if (pixelIsYellow) {
      mImg.pixels[idx + 0] = 0;
      mImg.pixels[idx + 1] = 0;
      mImg.pixels[idx + 2] = 0;
      mImg.pixels[idx + 3] = 0;
    } else {
      mImg.pixels[idx + 0] = redVal;
      mImg.pixels[idx + 1] = greenVal;
      mImg.pixels[idx + 2] = blueVal;
      mImg.pixels[idx + 3] = alphaVal;
    }
  }

  mImg.updatePixels();

  // Display images
  image(oImg, 0, 0);
  push();
  blendMode(HARD_LIGHT);
  image(mGif[GifFrame], 0, 500);
  image(mGif[GifFrame], 325, 0); 
  pop();
  image(mImg, 0, 0);

  // Display slider values
  fill(255);
  textSize(14);
  text("Red Amount: " + rAmount, 260, 148);
  text("Green Amount: " + gAmount, 260, 168);
  text("Blue Amount: " + bAmount, 260, 188);
  text("Color Picker", 260, 220);
  text(pickedColor, 260, 237);
  text("Animation Frame: " + GifFrame, 260, 278);
}
