import { renderHome } from "./views/homeView.js";
import { renderCreate } from "./views/createView.js";

export const router = () => {
    const app = document.getElementById("app");
    const hash = window.location.hash;

    // Limpiar contenido anterior
    app.innerHTML = "";

    switch (hash) {
        case "#/create":
            renderCreate(app);
            break;

        case "#/":
        case "":
            renderHome(app);
            break;

        default:
            app.innerHTML = "<h2>404 - Página no encontrada</h2>";
    }
};