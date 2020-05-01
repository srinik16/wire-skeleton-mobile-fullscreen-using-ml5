let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);
}

function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events */
document.ontouchmove = function(event) {
    event.preventDefault();
};

function gotPoses(poses){
console.log(poses);
  if(poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}             

function modelLoaded(){
 console.log("model is ready"); 
}

function draw() {
  image(video,0,0);
  rectMode(CENTER);
  rect(width / 2, height / 2, 200, 100);
  if(pose){
    for(let i =0; i <pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;   
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
    for(let i=0; i < skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    
  }
}