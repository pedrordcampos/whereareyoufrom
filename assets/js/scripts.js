const carousel = document.querySelector(".carousel");
const initialText = document.querySelector(".content-text");
const followersList = document.getElementById("followers-list");
let token = ""; // Token inicial vazio

// Função para adicionar cores a cada letra em um elemento de texto
function colorizeText(element) {
    const textContent = element.textContent;
    element.innerHTML = ""; // Limpa o conteúdo atual
    
    // Define um array de cores
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF8C33", "#33FFF3", "#9933FF"];

    // Envolve cada letra em um <span> com uma cor
    textContent.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.color = colors[index % colors.length];
        element.appendChild(span);
    });
}

// Função para limpar o carrossel
function clearCarousel() {
    carousel.innerHTML = "";
}

// Primeiro timeout: mostrar o texto inicial após 5 segundos e aplicar as cores
setTimeout(() => {
    clearCarousel();
    initialText.classList.remove("hidden");
    colorizeText(initialText); // Aplica a cor no texto "Where are you from?"
}, 5000);

// Segundo timeout: mostrar input de username após 10 segundos
setTimeout(() => {
    clearCarousel();
    initialText.classList.add("hidden");

    // Adiciona título para o input
    const heading = document.createElement("h2");
    heading.textContent = "Enter your GitHub username:";
    heading.className = "username-heading";
    carousel.appendChild(heading);

    colorizeText(heading); // Aplica o efeito colorido ao novo título

    // Criação do input para o nome de usuário
    const input = document.createElement("input");
    input.className = "username-input";
    input.type = "text";
    input.placeholder = "Type your GitHub username here";
    carousel.appendChild(input);

    // Criação do título para o token
    const tokenHeading = document.createElement("h2");
    tokenHeading.textContent = "Enter your Token:";
    tokenHeading.className = "token-heading";
    carousel.appendChild(tokenHeading);

    colorizeText(tokenHeading); // Aplica o efeito colorido ao novo título

    // Criação do input para o token
    const tokenInput = document.createElement("input");
    tokenInput.className = "token-input";
    tokenInput.type = "text";
    tokenInput.placeholder = "Type your GitHub token here";
    carousel.appendChild(tokenInput);

    // Criação do botão de envio
    const button = document.createElement("button");
    button.className = "send-username";
    button.textContent = "Search Followers";
    carousel.appendChild(button);

   // Adicionando evento de clique ao botão
   button.addEventListener("click", async () => {
       const username = input.value.trim();
       token = tokenInput.value.trim(); // Captura o token inserido

       // Se o usuário não fornecer o token, o sistema não deixa prosseguir
       if (!token) {
           alert("You must provide a GitHub token to access the follower list.");
           return;
       }

       if (username) {
           // Esconder os campos de input e o botão "Search Followers"
           const inputs = document.querySelectorAll(".username-input, .username-heading, .token-heading, .token-input, .send-username");
           inputs.forEach(input => input.classList.add("hidden"));

           // Mostrar a lista de seguidores
           followersList.classList.remove("hidden");

           // Chama a função para buscar os seguidores
           await fetchFollowers(username);  
       } else {
           alert("Please enter a valid GitHub username.");
       }
   });
}, 10000);

// Função para buscar seguidores do usuário
async function fetchFollowers(username) {
   followersList.innerHTML = "";
   let page = 1;
   let allFollowers = [];

   try {
       while (true) {
           const response = await fetch(`https://api.github.com/users/${username}/followers?per_page=100&page=${page}`, {
               headers: { "Authorization": `token ${token}` } // Usa o token fornecido
           });

           if (!response.ok) {
               const errorResponse = await response.json();
               throw new Error(errorResponse.message || "User not found or has no followers.");
           }

           const followers = await response.json();
           if (followers.length === 0) break;

           allFollowers = allFollowers.concat(followers);
           page++;
       }

       if (allFollowers.length === 0) {
           followersList.innerHTML = `<li>No followers found for "${username}".</li>`;
       } else {
           for (const follower of allFollowers) {
               const followerDetails = await fetch(`https://api.github.com/users/${follower.login}`, {
                   headers: { "Authorization": `token ${token}` } // Usa o token para acessar os detalhes
               });
               const details = await followerDetails.json();

               const listItem = document.createElement("li");
               listItem.classList.add("follower-item");

               // Avatar do seguidor
               const avatar = document.createElement("img");
               avatar.src = details.avatar_url;
               avatar.alt = `${details.login}'s avatar`;

               // Nome e localização
               const textContainer = document.createElement("div");
               const name = document.createElement("span");
               name.textContent = details.login;
               const location = document.createElement("p");
               location.textContent = details.location || "Location: Unknown";
               location.style.fontSize = "14px";
               location.style.color = "#666";

               textContainer.appendChild(name);
               textContainer.appendChild(location);

               listItem.appendChild(avatar);
               listItem.appendChild(textContainer);

               followersList.appendChild(listItem);
           }
       }
   } catch (error) {
       followersList.innerHTML = `<li style="color: #b30000;">Error: ${error.message}</li>`;
   }
}
