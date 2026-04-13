import { router } from "./router.js";

// Se ejecuta al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    router();
});

// Se ejecuta cuando cambia la URL (#)
window.addEventListener("hashchange", () => {
    router();
});