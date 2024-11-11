let handPose; // stores handPose model
let video; // stores webcam video
let hands = []; // stores array of detected hands (including keypoints)
let handColors = [];  // stores colors for each detected hand
let handBlendModes = [];  // stores blend modes for each hand
let handShapes = [];  // stores shapes for each hand

function preload() {
  // loading handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480); // common resolution for webcams
  video = createCapture(VIDEO);
  video.size(640, 480); // resize video
  video.hide(); // hide from display
  handPose.detectStart(video, gotHands); // start detecting hands from webcam video
}

function draw() {
  // draw webcam video
  translate(width, 0);
  scale(-1, 1); // flip video
  image(video, 0, 0, width, height);

  filter(POSTERIZE, 4);

  // if hands are detected
  if (hands.length > 0) {
    // loop through each hand's array -> fetch 'i'th detected hand -> store it in hand variable
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];

      // RANDOMIZE COLOR
      // if detected hand's color = not set, give it a random color
      if (handColors[i] === undefined || handColors[i] === null) {
        handColors[i] = color(random(255), random(255), random(255));
      }


      // RANDOMIZE BLEND MODE
      // if detected hand's blend mode = not set, give it random blend mode
      if (handBlendModes[i] === undefined) {
        let blendModes = [DIFFERENCE, BURN, ADD];
        handBlendModes[i] = random(blendModes);
      }
      // apply blend mode to hand
      blendMode(handBlendModes[i]);


      //RANDOMIZE SHAPE
      // if detected hand's shape = not set, give it either square/circle
      if (handShapes[i] === undefined) {
        handShapes[i] = random(["circle", "square"]);
      }


      //DETECTING KEYPOINTS
      // finding index finger tip and thumb tip keypoints for detected hand
      let finger = hand.index_finger_tip;
      let thumb = hand.thumb_tip;

      // calculating midpoint between the thumb and index
      let centerX = (finger.x + thumb.x) / 2;
      let centerY = (finger.y + thumb.y) / 2;

      // calculating pinch gesture gap distance between finger and thumb
      let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

      // if pinch gesture gap is less than 40, do not draw any shape
      if (pinch < 40) {
        continue;
      }

      //DRAWING OUT THE RESULTING SHAPES/COLORS ON DETECTED HANDS
      // color
      fill(handColors[i]);
      noStroke();

      // shape
      if (handShapes[i] === "circle") {
        circle(centerX, centerY, pinch);
      }
      else if (handShapes[i] === "square") {
        rect(centerX - pinch / 2, centerY - pinch / 2, pinch, pinch);
      }
    }
  }

  // reset blend mode back to normal after drawing shapes/colors
  blendMode(BLEND);

}

// gotHands is a callback function
// - is called when handPose.detectStart() detects hands
// - hands detected -> output results passed to gotHands() -> saved to hands variable 
function gotHands(results) {
  hands = results;

  // track number of detected hands -> stored in numHands variable
  let numHands = hands.length;

  // when new hands are detected -> apply new set of shapes/color/blend mode
  for (let i = handColors.length; i < numHands; i++) {
    handColors.push(undefined);
    handBlendModes.push(undefined);
    handShapes.push(undefined);
  }

  // when detected hands disappear -> remove their assigned shapes/color/blend modes as well
  for (let i = numHands; i < handColors.length; i++) {
    handColors.pop();
    handBlendModes.pop();
    handShapes.pop();
  }
}