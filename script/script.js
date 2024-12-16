import { fetchCulture } from './cultureAPI.js';
import { fetchEvents, boxList } from './eventsAPI.js';
import { fetchMusic} from './musicAPI.js';
import { yearDisplay } from './time.js';



// Get all the buttons you want to add hover effect to
const buttons = document.querySelectorAll('button');

// Function to change button style on mouseover
function handleMouseOver(event) {
   event.target.style.backgroundColor = '#ff6600';
   event.target.style.color = '#fff';
   event.target.style.transform = 'scale(1.1)';
}

// Function to reset button style on mouseout
function handleMouseOut(event) {
   event.target.style.backgroundColor = '';
   event.target.style.color = '';
   event.target.style.transform = 'scale(1)';
}

// Attach the event listeners to each button
buttons.forEach(button => {
   button.addEventListener('mouseover', handleMouseOver);
   button.addEventListener('mouseout', handleMouseOut);
});

document.addEventListener("DOMContentLoaded", () => {
   const cultureButton = document.getElementById("fetch-culture");
   const eventsButton = document.getElementById("fetch-events");
   const musicButton = document.getElementById("fetch-music");
   
   cultureButton.addEventListener("click", () => {
      const year = yearDisplay.textContent.trim() || "0000";
      if (year) {
         fetchCulture(year);
      } else {
         boxList.innerHTML = "Spin again.";
      }
   });
   
   eventsButton.addEventListener("click", () => {
      const year = yearDisplay.textContent.trim() || "0000";
      if (year) {
         fetchEvents(year);
      } else {
         boxList.innerHTML = "Spin again.";
      }
   });
   
   musicButton.addEventListener("click", () => {
      const year = yearDisplay.textContent.trim() || "0000";
      if (year) {
         fetchMusic(year);
      } else {
         boxList.innerHTML = "Spin again.";
      }
   });
});