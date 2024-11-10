let oImg; // Original image
let mImg; // Modified image

// Array to hold the yellow images (45 images)
let yellowImgs = [];

let rSlider, gSlider, bSlider;
let currentImgIndex = 0; // Initialize the image index

function preload() {
  // Load the original image
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");

  // Preload 45 images into the yellowImgs array
  for (let i = 1; i <= 45; i++) {
    yellowImgs.push(loadImage(`./09A_frames/F_${i}.png`)); // Assuming images are named F_1.png, F_2.png, etc.
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);

  oImg.loadPixels();
  mImg.loadPixels();

  // Create sliders for color modification
  rSlider = createSlider(0, 255, 128);
  rSlider.position(130, 140);

  gSlider = createSlider(0, 255, 128);
  gSlider.position(130, 160);

  bSlider = createSlider(0, 255, 128);
  bSlider.position(130, 180);

  // Create slider to select which yellow image to use
  let imgSlider = createSlider(0, yellowImgs.length - 1, 0, 1);
  imgSlider.position(130, 200);
  imgSlider.input(() => {
    currentImgIndex = imgSlider.value(); // Update the current image index when the slider changes
  });
}

function draw() {
  mImg.loadPixels();

  // Get current slider values for color adjustment
  let rAmount = rSlider.value();
  let gAmount = gSlider.value();
  let bAmount = bSlider.value();

  // Loop through each pixel and modify it based on color thresholds
  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {
    let redVal = oImg.pixels[idx + 0];
    let greenVal = oImg.pixels[idx + 1];
    let blueVal = oImg.pixels[idx + 2];
    let alphaVal = oImg.pixels[idx + 3];

    let pixelIsRed = redVal > 2 * greenVal && redVal > 2 * blueVal && redVal > 200;
    let pixelIsBlue = blueVal > 2 * redVal && blueVal > greenVal;
    let pixelIsYellow = redVal > greenVal && redVal > 2 * blueVal && redVal > 200;

    // FOR RED SECTIONS
    if (pixelIsRed) {
      mImg.pixels[idx + 0] = rAmount;
      mImg.pixels[idx + 1] = gAmount;
      mImg.pixels[idx + 2] = bAmount;
      mImg.pixels[idx + 3] = alphaVal;
    }
    // FOR BLUE SECTIONS
    else if (pixelIsBlue) {
      mImg.pixels[idx + 0] = 0;
      mImg.pixels[idx + 1] = 255;
      mImg.pixels[idx + 2] = 0;
      mImg.pixels[idx + 3] = alphaVal;
    }
    // FOR YELLOW SECTIONS: Replace with image from the selected index
    else if (pixelIsYellow) {
      let img = yellowImgs[currentImgIndex];  // Get the selected yellow image

      // Get the corresponding pixel position
      let x = (idx / 4) % oImg.width;  // x coordinate of the pixel
      let y = Math.floor((idx / 4) / oImg.width);  // y coordinate of the pixel

      // Map the coordinates to the selected image size
      let imgX = map(x, 0, oImg.width, 0, img.width);  // Scale x to the image size
      let imgY = map(y, 0, oImg.height, 0, img.height);  // Scale y to the image size

      let imgColor = img.get(imgX, imgY); // Get the pixel color from the image

      // Replace the yellow pixel with the image color
      mImg.pixels[idx + 0] = red(imgColor);
      mImg.pixels[idx + 1] = green(imgColor);
      mImg.pixels[idx + 2] = blue(imgColor);
      mImg.pixels[idx + 3] = alphaVal;
    }
    // For all other pixels, keep the original color
    else {
      mImg.pixels[idx + 0] = redVal;
      mImg.pixels[idx + 1] = greenVal;
      mImg.pixels[idx + 2] = blueVal;
      mImg.pixels[idx + 3] = alphaVal;
    }
  }

  mImg.updatePixels();  // Update the modified image pixels

  // Display the original and modified image
  image(oImg, 0, 0);  // Show the original image
  image(mImg, 0, 0);  // Show the modified image

  // Display the RGB slider values for feedback
  fill(255);
  textSize(14);
  text("Red: " + rAmount, 290, 148);
  text("Green: " + gAmount, 290, 168);
  text("Blue: " + bAmount, 290, 188);
  text("Image Index: " + currentImgIndex, 290, 208);
}
