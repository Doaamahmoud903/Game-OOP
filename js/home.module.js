import { Details } from "./details.module.js";
import { UI } from "./ui.module.js";

export class Home {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link"); 
    this.loader =document.querySelector(".loader");
    this.gameContent = document.getElementById("game-content");
    this.detailsContainer = document.getElementById("details");
    this.navbar = document.getElementById("navbar");

    this.body = document.body;
    this.ui = new UI();
    this.detailsModule = new Details();
    this.init();
    this.getGamesData(0)
  }

  init() {
    this.navLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        this.getGamesData(index);
      });
    });
  }

  async getGamesData(index) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    this.navLinks[index].classList.add('active');
    this.mainNavCollapse = document.getElementById("navbarTogglerDemo02");

    if (this.mainNavCollapse.classList.contains('show')) {
      this.mainNavCollapse.classList.remove('show'); // Hide the navbar
      const togglerButton = document.querySelector('.navbar-toggler');
      togglerButton.setAttribute('aria-expanded', 'false');
      togglerButton.classList.remove('collapsed');
  }
  
    let category = this.navLinks[index].getAttribute('data-category');
    
    // Fetch the games data and store it in a variable
    const data = await this.getGames(category);
  
    // Ensure data is available before proceeding
    if (!data || data.length === 0) {
      console.error('No data returned for the selected category.');
      return;
    }
  
    // Display the games using the UI class
    this.ui.displayGames(data);
  
    let cards = document.querySelectorAll(".card");
  
    // Attach event listeners to each card
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        const gameId = data[i].id;  // Get the actual game ID from the data
        this.detailsContainer.classList.remove('d-none');
        this.gameContent.classList.add('d-none');
        this.navbar.classList.add('d-none');
        this.detailsModule.getDetails(gameId);  // Pass the correct game ID
      });
    });
  }
  

  async getGames(category) {
    this.loader.classList.remove("d-none");
    this.loader.classList.add("d-flex");
    this.body.style.overflow="hidden";
    const options = {
      method: "get",
      headers: {
        'x-rapidapi-key': '18dd82a2d5mshb61c2f59966795dp17b851jsn542b493d532f',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const data = await response.json();
    this.loader.classList.remove("d-flex");

    this.loader.classList.add("d-none");
    this.body.style.overflow="auto";


    return data;
  }
}
