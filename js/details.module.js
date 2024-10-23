import { UI } from "./ui.module.js";

export class Details{
    constructor(){
        this.body = document.body;

        this.loader =document.querySelector(".loader");
        this.gameContent = document.getElementById("game-content");
        this.detailsContainer = document.getElementById("details");
        this.iconClose = document.getElementById("icon-close");
        this.navbar = document.getElementById("navbar");
        this.iconClose.addEventListener('click' , ()=>{
            this.detailsContainer.classList.add('d-none');
            this.gameContent.classList.remove('d-none');
            this.navbar.classList.remove('d-none');

          })
    }

    async getDetails(id) {
        this.loader.classList.remove("d-none");
        this.loader.classList.add("d-flex");
        this.body.style.overflow="hidden";
        let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        let options = {
            method: "GET",
            headers: {
                'x-rapidapi-key': '18dd82a2d5mshb61c2f59966795dp17b851jsn542b493d532f',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
    

            let request = await fetch(url, options);
            let response = await request.json();
            let Ui = new UI();
            Ui.displayGameDetails(response);
            console.log(response);
            
            this.loader.classList.remove("d-flex");
            this.loader.classList.add("d-none");
            this.body.style.overflow="auto";
    
     
    }
    
}