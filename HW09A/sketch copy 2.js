let images = [];  // Array to hold images
let slider;       // Slider for selecting image index

function preload() {
  // Load 48 images into the array
  for (let i = 1; i <= 48; i++) {
    images.push(loadImage(`09A_frames/F_${i}.png`));  // Adjust path as needed
  }
}

function setup() {
  createCanvas(608, 608);
  
  // Create a slider with min=0, max = 47 (for 48 images), and initial value set to 0
  slider = createSlider(0, images.length - 1, 0);
  slider.position(10, height - 30);
}

function draw() {
  background(255);
  
  // Get the slider value, which corresponds to the image index
  let index = slider.value();
  
  // Display the selected image
  image(images[index], 0, 0, width, height); // Scale image to fit canvas
}