# GitHub Followers Search

Um projeto simples que permite aos usuários pesquisar seguidores no GitHub por nome de usuário. Este projeto utiliza a API do GitHub para buscar a lista de seguidores, exibindo detalhes como nome e localização. A aplicação possui um design interativo colorido com animações no texto.

## Funcionalidades

- Pesquisar seguidores de qualquer usuário do GitHub.
- Exibe o nome de usuário, localização e avatar de cada seguidor.
- Animações coloridas para o texto "Where are you from?" e o prompt "Enter your GitHub username:".
- Tratamento de erros para nomes de usuários inválidos ou não encontrados.
- Notificação quando o token do GitHub não é fornecido ou quando o limite de requisições é atingido.

## Requisitos

Para rodar este projeto localmente, você vai precisar de:

- Um navegador web (Chrome, Firefox, etc.).
- Um editor de texto ou IDE (ex: VSCode) para editar os arquivos (caso necessário).

## Como Rodar o Projeto Localmente

### 1. Clone o repositório
Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/github-followers-search.git
cd github-followers-search
````

2. Abra o projeto no seu navegador
Você pode abrir diretamente o arquivo index.html no seu navegador:
```bash
open index.html
````

3. Configurando o Token do GitHub (Opcional, mas recomendado)
Por padrão, o app funciona sem o token do GitHub, mas existem limites de requisição da API do GitHub para requisições não autenticadas. Para realizar requisições sem limites, é necessário adicionar o seu token pessoal do GitHub.

Como obter um Token do GitHub:
Acesse o GitHub.
Clique na sua foto de perfil no canto superior direito e selecione Settings.
Na barra lateral esquerda, clique em Developer settings.
Selecione Personal access tokens e clique em Generate new token.
Selecione as permissões apropriadas (para este projeto, você precisa apenas de repo e read:user).
Clique em Generate token e copie o token gerado.

Adicionando o token no seu projeto:
Abra o arquivo assets/js/scripts.js.
Localize a linha com const token = "";.
Cole o seu token dentro das aspas, como no exemplo abaixo:
Copiar código

```bash
const token = "SEU_TOKEN_DO_GITHUB_AQUI";
````
Salve as alterações no arquivo scripts.js.
Sem o Token
Se você não quiser usar o token do GitHub, o aplicativo ainda funcionará, mas estará sujeito aos limites de requisição não autenticada do GitHub. Caso você ultrapasse esses limites, uma mensagem de erro será exibida.

Como Usar a Aplicação
Quando a página carregar, você verá uma animação colorida e a mensagem: "Where are you from?".
Após alguns segundos, o aplicativo pedirá para você Entrar com seu nome de usuário do GitHub.
Digite qualquer nome de usuário do GitHub no campo de entrada e clique em Buscar Seguidores.
Os seguidores do nome de usuário informado serão exibidos com nome, avatar e localização.
Caso haja algum erro (por exemplo, o nome de usuário não existe ou o token está ausente), uma mensagem de erro será exibida abaixo do campo de entrada.
Contribuindo
Fique à vontade para abrir issues ou enviar pull requests para melhorar o projeto.

Faça um fork do repositório.
Crie uma nova branch.
Faça as alterações necessárias.
Envie um pull request.
Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

