import { boxList } from './eventsAPI.js';
export const API_URL3 = "https://echlarson.github.io/jsonStorage/musicChart.json";

// Grab the HTML elements
export const musicButton = document.getElementById("fetch-music");

//Fetch Music
export const fetchMusic = async (year) => {
   try {
      //Loading Message
      boxList.innerHTML = "Loading...";

      const response = await fetch(`${API_URL3}`);

      //Is the response ok?
      if(!response.ok) {
         throw new Error("Failed to fetch songs.");
      }

      //Convert response to JSON
      const data = await response.json();
      const topSongs = data.topSongsByYear[year];

      //Display Data
      displayMusic(topSongs);
      } catch (error) {
         boxList.innerHTML = `Error: ${error.message}`;
      }
   };

export const displayMusic = (songs) => {
   //clear the section
   boxList.innerHTML = "";
   
   if (songs.length === 0) {
      boxList.innerHTML = "No songs found for this year.";
      return;
   }

   //Create Cards
   songs.forEach ((song) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const rank = document.createElement("h3");
      const track = document.createElement("p");
      const artist = document.createElement("p");
      const genre = document.createElement("p");
      const album = document.createElement("p");
      const releaseDate = document.createElement("p");

      rank.textContent = `Ranked #${song.rank}`;
      track.textContent = `${song.title}`; 
      artist.textContent = `by ${song.artist}`;
      genre.textContent = `Genre: ${song.genre}`;
      album.textContent = `Album: ${song.album}`;
      releaseDate.textContent = `Release Date: ${song.releaseDate}`;

      card.appendChild(rank);
      card.appendChild(track);
      card.appendChild(artist);
      card.appendChild(genre);
      card.appendChild(album);
      card.appendChild(releaseDate);

      boxList.appendChild(card);
   });
};