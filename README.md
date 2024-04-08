<p align="center">
&nbsp;
    <img src="https://img.shields.io/badge/version-v0.0.9-blue"/>
    <img src="https://img.shields.io/github/contributors/leonardoakio/keycloak-client"/>
    <img src="https://img.shields.io/github/stars/leonardoakio/keycloak-client?style=sociale"/>
    <img src="https://img.shields.io/github/forks/leonardoakio/keycloak-client?style=social"/>
    <img src="https://img.shields.io/badge/License-MIT-blue"/>
</p>

## Simple Keycloak Client para Laravel
O pacote serve de implementação para diferentes `grant_types` comunicando e autenticando com um host do Keycloak

## Iniciando o projeto
Para instalar a library da página de login 
```shell
npm i keycloak-auth-client
```
Ou se já estiver instalado, realizar o update do pacote *NPM* para verificar se não há alguma nova versão
```shell
npm update keycloak-auth-client
```
Agora no arquivo `main.js`, que é o ponto de entrada principal da aplicação, fazemos o import do componente presente na library instalada 
```javascript
import LoginInput from "keycloak-auth-client";
import "keycloak-auth-client/dist/style.css";
```
No mesmo arquivo, criamos uma instância do componente na aplicação Vue.js
```javascript
const app = createApp(App);
app.use(LoginInput);
```
### Utilizando no projeto
Agora conseguimos utilizá-lo globalmente apenas chamando o componente em alguma das páginas
```javascript
<login-input></login-input>
<LoginInput />
```

### Estrutura
```bash
├── src/components        # Componentes disponibilizados na library
├── src/helpers           # Helper que realiza o mascaramento de atributos
├── src/services          # Axios interceptor para validar tokens de acesso e refresh token
├── composer.json         # Listar as dependências do projeto e suas versões
```

### Dependências
| Recurso            | Versão    |
|--------------------|-----------|
| vue.js             | `^3.4.21` |
| axios              | `^1.6.1`  |
| js-cookie          | `3.0.5`   |

### Guias:
- [Publish a Vue Component to NPM // Vite and Vue 3](https://www.youtube.com/watch?v=5QV9wVc8c7g)
- [Building a Vue 3 component library](https://blog.logrocket.com/building-vue-3-component-library/)
