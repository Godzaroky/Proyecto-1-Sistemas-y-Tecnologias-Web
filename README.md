# Proyecto-1-Sistemas-y-Tecnologias-Web

## Descripción del proyecto

El proyecto consiste en el desarrollo de una aplicación web tipo blog que implementa un sistema CRUD (Create, Read, Update, Delete) consumiendo una API REST. La aplicación permite a los usuarios visualizar, crear, editar y eliminar publicaciones de forma dinámica, sin necesidad de recargar la página.
El objetivo principal es aplicar conceptos fundamentales del desarrollo web utilizando tecnologías base: HTML, CSS y JavaScript (Vanilla). A través de este proyecto se integran operaciones HTTP (GET, POST, PUT/PATCH y DELETE), manipulación del DOM, manejo de estados (carga, error y éxito), validación de formularios y organización modular del código.
La aplicación está diseñada para ofrecer una experiencia de usuario clara e interactiva, incorporando navegación entre vistas, filtrado de contenido y retroalimentación visual en cada acción realizada.

## Estructura del proyecto

```text
proyecto-1/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   └── images/
├── css/
│   ├── main.css
│   ├── layout.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── router.js
│   ├── api.js
│   ├── ui.js
│   ├── validation.js
│   ├── views/
│   │   ├── homeView.js
│   │   ├── detailView.js
│   │   ├── createView.js
│   │   └── editView.js
│   └── utils/
│       ├── helpers.js
│       └── constants.js
```

## Organización del código

El proyecto está estructurado de forma modular para separar responsabilidades:

* **api.js**: Maneja todas las solicitudes HTTP a la API (GET, POST, PUT, DELETE).
* **ui.js**: Encargado de renderizar contenido dinámico en el DOM.
* **validation.js**: Contiene la lógica de validación de formularios.
* **router.js**: Gestiona la navegación entre vistas sin recargar la página.
* **views/**: Contiene las diferentes vistas de la aplicación (listado, detalle, crear, editar).
* **utils/**: Funciones reutilizables y constantes globales.
