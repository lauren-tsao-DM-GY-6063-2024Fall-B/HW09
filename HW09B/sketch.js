let handPose;
let video;
let hands = [];
let handColors = [];  // Array to store colors for each detected hand
let handBlendModes = [];  // Array to store the blend mode for each hand
let handShapes = [];  // Array to store the shape type for each hand

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video first
  image(video, 0, 0, width, height);

  filter(POSTERIZE, 4);

  // If there are hands detected
  if (hands.length > 0) {
    // Loop through each hand
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];

      // If the color for this hand has not been set, assign a random color
      if (handColors[i] === undefined || handColors[i] === null) {
        handColors[i] = color(random(255), random(255), random(255));  // Generate a random color
      }
      

      // If the blend mode for this hand has not been set, assign a random blend mode
      if (handBlendModes[i] === undefined) {
        let blendModes = [DIFFERENCE, BURN, ADD];
        handBlendModes[i] = random(blendModes);  // Assign a random blend mode
      }

      // Apply the blend mode for this hand
      blendMode(handBlendModes[i]);

      // If the shape for this hand has not been set, randomly choose between square and circle
      if (handShapes[i] === undefined) {
        handShapes[i] = random(["circle", "square"]);  // Randomly choose shape
      }

      // Find the index finger tip and thumb tip for this hand
      let finger = hand.index_finger_tip;
      let thumb = hand.thumb_tip;

      // Calculate the midpoint between the thumb and index
      let centerX = (finger.x + thumb.x) / 2;
      let centerY = (finger.y + thumb.y) / 2;

      // Calculate the pinch "distance" between finger and thumb
      let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

      if (pinch < 40) {
        continue;  // Skip to the next hand (this hand won't draw any shape)
      }

      // Set the color for the current hand
      fill(handColors[i]);
      noStroke();

      // Draw the shape based on the chosen type (circle or square)
      if (handShapes[i] === "circle") {
        circle(centerX, centerY, pinch);  // Draw circle
      } else if (handShapes[i] === "square") {
        rect(centerX - pinch / 2, centerY - pinch / 2, pinch, pinch);  // Draw square
      }
    }
  }

  // Reset blend mode to normal after drawing shapes
  blendMode(BLEND);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  hands = results;

  // Add or remove entries based on the difference in array lengths
  let numHands = hands.length;  // Using `let` instead of `const`

  // Add entries for new hands
  for (let i = handColors.length; i < numHands; i++) {
    handColors.push(null);  // Add a null color entry for new hands
    handBlendModes.push(undefined);  // Add an undefined blend mode entry for new hands
    handShapes.push(undefined);  // Add an undefined shape entry for new hands
  }

  // Remove entries for lost hands
  for (let i = numHands; i < handColors.length; i++) {
    handColors.pop();  // Remove color entries for lost hands
    handBlendModes.pop();  // Remove blend mode entries for lost hands
    handShapes.pop();  // Remove shape entries for lost hands
  }
}


