import { renderHome } from "./views/homeView.js";
import { renderCreate } from "./views/createView.js";
import { renderDetail } from "./views/detailView.js";
import { renderEdit } from "./views/editView.js";

export const router = () => {
    const app = document.getElementById("app");
    const hash = window.location.hash;

    app.innerHTML = "";

    // Rutas con parámetro de ID
    if (hash.startsWith("#/post/") && !hash.includes("edit")) {
        const id = hash.split("/")[2];
        renderDetail(app, id);
        return;
    }

    if (hash.startsWith("#/post/") && hash.includes("edit")) {
        const id = hash.split("/")[2];
        renderEdit(app, id);
        return;
    }

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