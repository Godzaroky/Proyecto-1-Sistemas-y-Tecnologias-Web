<!-- Improved compatibility of back to top link -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Proyecto 1 · CRUD Blog App</h3>

  <p align="center">
    Aplicación web tipo blog con CRUD completo consumiendo una API REST
    <br />
    <a href="https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web"><strong>Explorar el repositorio »</strong></a>
    <br />
    <br />
    <a href="#">Ver Demo</a>
    ·
    <a href="https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/issues/new?labels=bug">Reportar Bug</a>
    ·
    <a href="https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/issues/new?labels=enhancement">Solicitar Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre el Proyecto</a>
      <ul>
        <li><a href="#built-with">Tecnologías</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Cómo Empezar</a>
      <ul>
        <li><a href="#prerequisites">Prerequisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#structure">Estructura del Proyecto</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">Licencia</a></li>
    <li><a href="#contact">Contacto</a></li>
    <li><a href="#acknowledgments">Recursos</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screenshot][product-screenshot]](#)

El proyecto consiste en el desarrollo de una aplicación web tipo blog que implementa un sistema CRUD completo (Create, Read, Update, Delete) consumiendo una API REST. La aplicación permite a los usuarios visualizar, crear, editar y eliminar publicaciones de forma dinámica, sin necesidad de recargar la página.

El objetivo principal es aplicar conceptos fundamentales del desarrollo web utilizando tecnologías base: HTML, CSS y JavaScript (Vanilla). A través de este proyecto se integran operaciones HTTP (GET, POST, PUT/PATCH y DELETE), manipulación del DOM, manejo de estados (carga, error y éxito), validación de formularios y organización modular del código.

La aplicación está diseñada para ofrecer una experiencia de usuario clara e interactiva, incorporando navegación entre vistas, filtrado de contenido y retroalimentación visual en cada acción realizada.

**Funcionalidades principales:**
- Listado paginado de publicaciones con skeleton loader
- Vista de detalle con información completa
- Creación y edición de publicaciones con validaciones
- Eliminación con confirmación explícita
- Búsqueda y filtros combinables
- Feedback visual: estados de carga, éxito y error

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![HTML5][HTML5-shield]][HTML5-url]
* [![CSS3][CSS3-shield]][CSS3-url]
* [![JavaScript][JS-shield]][JS-url]
* [![DummyJSON][DummyJSON-shield]][DummyJSON-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->
## Getting Started

Para obtener una copia local y ejecutarla, sigue estos pasos.

### Prerequisites

Solo necesitas un navegador moderno y opcionalmente un servidor local para evitar problemas con módulos ES6.

* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (extensión de VS Code recomendada)
* Git instalado en tu máquina

### Installation

1. Clona el repositorio
   ```sh
   git clone https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.git
   ```
2. Entra a la carpeta del proyecto
   ```sh
   cd Proyecto-1-Sistemas-y-Tecnologias-Web
   ```
3. Abre `index.html` con Live Server en VS Code, o directamente en tu navegador

> **Nota:** No se requiere instalación de dependencias. El proyecto usa Vanilla JS sin frameworks ni herramientas de build.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- USAGE -->
## Usage

1. **Listado**: Al abrir la app verás las publicaciones paginadas (10 por página).
2. **Detalle**: Haz clic en cualquier publicación para ver su información completa.
3. **Crear**: Usa el botón "Nueva Publicación" para abrir el formulario de creación.
4. **Editar**: Desde la vista de detalle, presiona "Editar" para modificar una publicación.
5. **Eliminar**: Desde la vista de detalle, presiona "Eliminar" — se te pedirá confirmación.
6. **Buscar**: Usa los filtros en el listado para buscar por título, autor o etiquetas.

La API utilizada es [DummyJSON](https://dummyjson.com/docs/posts), que simula persistencia respondiendo correctamente a todos los verbos HTTP.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- STRUCTURE -->
## Structure

```text
proyecto-1/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   └── images/
├── css/
│   ├── main.css          ← estilos globales y variables CSS
│   ├── layout.css        ← navegación y estructura de páginas
│   └── components.css    ← cards, botones, formularios
├── js/
│   ├── main.js           ← punto de entrada e inicialización
│   ├── router.js         ← navegación entre vistas (SPA)
│   ├── api.js            ← todas las funciones fetch (GET, POST, PUT, DELETE)
│   ├── ui.js             ← renderizado dinámico en el DOM
│   ├── validation.js     ← validaciones de formularios
│   ├── views/
│   │   ├── homeView.js   ← vista del listado principal
│   │   ├── detailView.js ← vista de detalle de publicación
│   │   ├── createView.js ← formulario de creación
│   │   └── editView.js   ← formulario de edición
│   └── utils/
│       ├── helpers.js    ← funciones reutilizables
│       └── constants.js  ← constantes globales (URL base, etc.)
```

### Organización del código

| Módulo | Responsabilidad |
|---|---|
| `api.js` | Todas las solicitudes HTTP a la API (GET, POST, PUT, DELETE) |
| `ui.js` | Renderizado dinámico de contenido en el DOM |
| `validation.js` | Lógica de validación de formularios con mensajes inline |
| `router.js` | Navegación entre vistas sin recargar la página |
| `views/` | Una vista por pantalla (listado, detalle, crear, editar) |
| `utils/` | Funciones helper reutilizables y constantes globales |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ROADMAP -->
## Roadmap

- [x] RF-01 · Listado paginado con skeleton loader
- [x] RF-02 · Vista de detalle con GET por ID
- [x] RF-03 · Formulario de creación con validaciones (POST)
- [x] RF-04 · Formulario de edición precargado (PUT/PATCH)
- [x] RF-05 · Eliminación con confirmación (DELETE)
- [x] RF-06 · Búsqueda y filtros combinables
- [x] RF-07 · Feedback visual completo (carga, éxito, error, vacío)
- [x] RF-08 · Navegación clara + sección adicional
- [ ] Mejoras de accesibilidad (ARIA labels)
- [ ] Modo oscuro

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- LICENSE -->
## License

Distribuido bajo la licencia MIT. Ver `LICENSE.txt` para más información.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTACT -->
## Contact

**Integrante 1** — [@github_username](https://github.com/Godzaroky)

**Integrante 2** — [@CasUVG220](https://github.com/CasUVG220)

Project Link: [https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web](https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [DummyJSON API](https://dummyjson.com) — API REST simulada usada en el proyecto
* [JSONPlaceholder](https://jsonplaceholder.typicode.com) — alternativa de API para pruebas
* [MDN Web Docs](https://developer.mozilla.org) — referencia de Fetch API y módulos JS
* [CSS Tricks — Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Git Commit Message Guide](https://www.conventionalcommits.org/en/v1.0.0/)
* [Img Shields](https://shields.io)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.svg?style=for-the-badge
[contributors-url]: https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.svg?style=for-the-badge
[forks-url]: https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/network/members
[stars-shield]: https://img.shields.io/github/stars/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.svg?style=for-the-badge
[stars-url]: https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/stargazers
[issues-shield]: https://img.shields.io/github/issues/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.svg?style=for-the-badge
[issues-url]: https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/issues
[license-shield]: https://img.shields.io/github/license/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web.svg?style=for-the-badge
[license-url]: https://github.com/Godzaroky/Proyecto-1-Sistemas-y-Tecnologias-Web/blob/master/LICENSE.txt
[product-screenshot]: assets/images/screenshot.png

[HTML5-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3-shield]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JS-shield]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JS-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[DummyJSON-shield]: https://img.shields.io/badge/DummyJSON-API-green?style=for-the-badge
[DummyJSON-url]: https://dummyjson.com
