import { boxList } from './eventsAPI.js';
export const API_URL4 = "https://echlarson.github.io/jsonStorage/popCulture.json";

// Grab the HTML elements
export const cultureButton = document.getElementById("fetch-culture");

//Fetch Music
export const fetchCulture = async (year) => {
   try {
      //Loading Message
      boxList.innerHTML = "Loading...";

      const response = await fetch(`${API_URL4}`);

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch Pop Culture.");
      }

      //Convert response to JSON
      const data = await response.json();
      const popCulture = data.popCultureByYear[year];

      //Display Data
      displayCulture(popCulture);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
      }
   };

   export const displayCulture = (popEvent) => {
      //clear the section
      boxList.innerHTML = "";
      
      if (popEvent.length === 0) {
         boxList.innerHTML = "No events found for this year.";
         return;
      }
   
      //Create Cards
      popEvent.forEach ((pop) => {
         const card = document.createElement("div");
         card.setAttribute("class", "card");
   
         const date = document.createElement("h3");
         const event = document.createElement("h3");
         const description = document.createElement("p");
         const type = document.createElement("p");
         const relatedIndustries = document.createElement("p");
         const socialMentions = document.createElement("p");
         const funFact = document.createElement("p");
         const hashtagsContainer = document.createElement("div");

         date.textContent = `${pop.date}`;
         event.textContent = `${pop.event}`; 
         description.textContent = `${pop.description}`;
         type.textContent = `Event Type: ${pop.type}`
         relatedIndustries.textContent = `Related Industries: ${pop.related_industries}`
         socialMentions.textContent = `Social Mentions: ${pop.social_mentions}`
         funFact.textContent = `Fun Fact: ${pop.fun_fact}`
    
         // Handle hashtags array
         if (Array.isArray(pop.hashtags) && pop.hashtags.length > 0) {
            pop.hashtags.forEach((hashtag) => {
               const hashtagElement = document.createElement("li");
               hashtagElement.textContent = `${hashtag.trim()}`;
               hashtagElement.style.marginRight = "5px"; // Optional: add space between hashtags
               hashtagsContainer.appendChild(hashtagElement);
         });
  
         } else {
            hashtagsContainer.textContent = "No hashtags available";
         }

         card.appendChild(date);
         card.appendChild(event);
         card.appendChild(description);
         card.appendChild(type);
         card.appendChild(relatedIndustries);
         card.appendChild(socialMentions);
         card.appendChild(funFact);
         card.appendChild(hashtagsContainer);

         boxList.appendChild(card);
      });
   };