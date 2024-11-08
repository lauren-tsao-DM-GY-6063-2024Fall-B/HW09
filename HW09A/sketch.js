let slider;
let images = [];
let totalImages = 48; // Change this to the number of images you have

function preload() {
  // Load images into an array
  for (let i = 0; i < totalImages; i++) {
    images[i] = loadImage(`../09A_frames/F_${i + 1}.jpg`); // Adjust the path accordingly
  }
}

function setup() {
  createCanvas(400, 400);

  // Create a slider with values from 0 to the total number of images minus 1
  slider = createSlider(0, totalImages - 1, 0, 48); 
  slider.position(10, 10);
  slider.size(80);
}

function draw() {
  background(255); // Clear the background

  // Get the current slider value
  let index = slider.value();

  // Display the corresponding image based on the slider's value
  image(images[index], 0, 0, width, height);
}