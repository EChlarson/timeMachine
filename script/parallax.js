//html setup
export var itemsHTMLCollection = document.getElementsByClassName('parallax-item');
export var itemsArray = Array.from(itemsHTMLCollection);
 
//Input Setup
export var input = {
  mouseX:{
    start: 0,
    end: window.innerWidth,
    current: 0,
  }
};
 
input.mouseX.range = input.mouseX.end - input.mouseX.start;
 
//Output Setup
export var output = {
  x: {
    start: -10,
    end: 10,
    current: 0,
  },
  zIndex: {
    range: 10000
  },
  blur: {
    startingDepth: .2,
    range: 2
  }
};
 
output.x.range = output.x.end - output.x.start;
 
export var mouse = {
  x: window.innerWidth * .5,
}
 
export var updateInputs = function() {
  //mouse x and y inputs
  input.mouseX.current = mouse.x;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
}
 
export var updateOutputs = function() {
  //output x and y
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
}
 
export var updateEachParallaxItem = function() {
  //apply output to html
  itemsArray.forEach(function(item, k) {
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range*depth),
      blur: (depth - output.blur.startingDepth) * output.blur.range
    };
    
    item.style.filter = 'blur('+itemOutput.blur+'px)'
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'translate('+itemOutput.x+'px)';
  });  
}
 
export var handleMouseMove = function(event){
  mouse.x = event.clientX;
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
}
 
export var handleResize = function () {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
}
 
// Initialize the parallax effect
export const initParallax = () => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
};