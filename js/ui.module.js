export class UI {
    constructor() {
    }
    
    displayGames(data) {
      let cartoona = ''; 
  
      for (let i = 0; i < data.length; i++) {
        cartoona += `
          <div class="col-md-3">
            <div class="card bg-dark text-white cursor-pointer" style="height: 400px;">
              <img class="card-img-top" src='${data[i].thumbnail}' alt="Card image cap">
              <div class="card-header">
                <div class="d-flex justify-content-between" >
                  <h5 class="card-title" style="font-size: 18px;">${data[i].title.split(" ").slice(0,3).join(" ")}</h5>
                  <div class="text-primary">Free</div>
                </div>
                <hr/>
                <div class="card-body p-0" style="height: 80px;">
                  <p class="card-text mainFont">${data[i].short_description.split(" ").slice(0,10).join(" ")}</p>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between" style="font-size: 14px;">
                <p>${data[i].genre}</p>
                <p>${data[i].platform}</p>
              </div>
            </div>
          </div>
        `;
      }
  
      document.getElementById("game-container").innerHTML = cartoona;
    }
    
    displayGameDetails(data) {
      // Create screenshot HTML
      let screenshotHTML = '';
      for (let i = 0; i < data.screenshots.length; i++) {
        screenshotHTML += ` 
          <div class="col-3">
            <img src="${data.screenshots[i].image}" class="w-100 cursor-pointer" alt="game-screenshot">
          </div>
        `;
      }
      screenshotHTML += ` <div class="col-3">
            <img src="${data.thumbnail}" class="w-100 cursor-pointer" alt="game-screenshot">
          </div>`
    
      // Create the rest of the game details HTML
      let cartoona = `
        <div class="row d-flex justify-content-center primaryFont" id="game-details">
          <div class="col-md-5">
            <div class="game-photo">
              <div class="game-heading mt-2 text-center">
                <h2 class="mt-4">${data.title}</h2>
              </div>
              <img src="${data.thumbnail}" alt="game-photo" class="w-100 rounded-2 cursor-pointer" id="mainImg"/>
            </div>
            <div class="row g-2 mt-1 d-flex justify-content-center">
              ${screenshotHTML}
            </div>
          </div>
          <div class="col-md-6 ms-5">
            <div class="game-info">
              <div class="game-para">
                <h2>${data.title}</h2>
                <p class="fs-5">Category: <span class="text-danger">${data.genre}</span></p>
                <p class="fs-5">Platform: <span class="text-danger">${data.platform}</span></p>
                <p class="fs-5">Status: <span class="text-danger">${data.status}</span></p>
              </div>
              <p class="small game-desc mb-3 py-2">
                ${data.description.split(" ").slice(0, 120).join(" ")}.
              </p>
              <a type="button" target="_blank" href="${data.game_url}" class="tabColor fs-5 btn btn-secondary">
                Show Game
              </a>
            </div>
          </div>
        </div>
      `;
    
      document.getElementById('details-box').innerHTML = cartoona;

      let screenshotImages = document.querySelectorAll('#game-details img');
      screenshotImages.forEach((img) => {
        img.addEventListener('click', (event) => {
          console.log(event.target.src);
          let newSrc = event.target.src;
          document.getElementById("mainImg").src = newSrc;
        });
      });
    }
    
    
  }
  