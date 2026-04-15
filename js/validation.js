import { showFieldError, clearFieldError } from "./ui.js";

export const validatePostForm = (fields) => {
    let isValid = true;

    clearFieldError("title");
    clearFieldError("body");
    clearFieldError("author");

    if (!fields.title || fields.title.trim().length < 5) {
        showFieldError("title", "El título debe tener al menos 5 caracteres.");
        isValid = false;
    }

    if (!fields.body || fields.body.trim().length < 20) {
        showFieldError("body", "El contenido debe tener al menos 20 caracteres.");
        isValid = false;
    }

    if (!fields.author || fields.author.trim().length === 0) {
        showFieldError("author", "El nombre del autor es requerido.");
        isValid = false;
    }

    return isValid;
};