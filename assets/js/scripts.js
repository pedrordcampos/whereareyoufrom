const carousel = document.querySelector(".carousel");
const initialText = document.querySelector(".content-text");

// Função para limpar o carrossel
function clearCarousel() {
    carousel.innerHTML = "";
}

// Primeiro timeout: mostrar o texto inicial após 5 segundos
setTimeout(() => {
    clearCarousel(); 
    initialText.classList.remove("hidden"); 
}, 5000); 

// Segundo timeout: mostrar input de username após 10 segundos
setTimeout(() => {
    clearCarousel(); 
    initialText.classList.add("hidden");
    
    const heading = document.createElement("h2");
    heading.textContent = "Your username on Github:";
    carousel.appendChild(heading);

    const input = document.createElement("input");
    input.className = "username-input";
    input.type = "text";
    carousel.appendChild(input);

    const button = document.createElement("button");
    button.className = "send-username";
    button.textContent = "Send"; 
    carousel.appendChild(button);

    // Adicionando evento de clique ao botão
    button.addEventListener("click", () => {
        const username = input.value; 
        if (username) {
            let follores = [];

            // Chamando a API do GitHub
            
            const followerDetails = await fetch(`https://api.github.com/users/${follower.login}`).then(response => response.json());
            followers.push({ name: followerDetails.login, country: followerDetails.location });
            
        } else {
            alert("Please enter a username."); 
        }
    });
}, 10000);
