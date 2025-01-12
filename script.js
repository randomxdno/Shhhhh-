let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#FD8A8A");
  gradientColor.addColorStop(1, "#FFF6BD");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 200, 200);

};

//initially mouse X and mouse Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Start Scratch
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  //Get x and y position
  getXY(event);
  scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

//stop drawing
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

//If mouse leaves the square
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out draws new shapes behind the existing canvas content
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc makes circle - x,y,radius,start angle,end angle
  context.arc(x, y, 10, 0, 2 * Math.PI);
  context.fill();
};

window.onload = init();



function displayRandomImage() {
      // Generate a random number between 1 and 40
      const randomNumber = Math.floor(Math.random() * 40) + 1;
  
      // Construct the image file name (e.g., 1.png, 2.png, etc.)
      const imageName = `${randomNumber}.png`;
  
      // Create the full path to the image
      const imagePath = `${imageName}`;
  
      // Find the target element where the image will be displayed
      const imageContainer = document.getElementById('image-container');
  
      // Clear any existing content inside the container
      imageContainer.innerHTML = '';
  
      // Create a new image element
      const imgElement = document.createElement('img');
      imgElement.src = imagePath;
      imgElement.alt = `Random Image ${randomNumber}`;
  
      // Add the image element to the container
      imageContainer.appendChild(imgElement);
  }
  
  // Call the function to display a random image on page load
  window.onload = displayRandomImage;
  
    

function nextScratch () {
      location.reload();
      displayRandomImage();
}
    

