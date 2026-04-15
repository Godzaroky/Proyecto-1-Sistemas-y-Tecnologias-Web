import { truncate } from "./utils/helpers.js";

// Muestra un spinner mientras carga
export const showSpinner = (container) => {
    container.innerHTML = `
        <div class="spinner-wrapper">
            <div class="spinner"></div>
            <p>Cargando...</p>
        </div>
    `;
};

// Toast temporal de exito o error
export const showToast = (message, type = "success") => {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("toast--visible"), 10);
    setTimeout(() => {
        toast.classList.remove("toast--visible");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Mensaje de error en pantalla completa
export const showError = (container, message = "Algo salió mal. Intenta de nuevo.") => {
    container.innerHTML = `
        <div class="error-state">
            <p class="error-state__icon">X</p>
            <p class="error-state__message">${message}</p>
            <a href="#/" class="btn btn--secondary">Volver al inicio</a>
        </div>
    `;
};

// Cuando una búsqueda no devuelve resultados
export const showEmpty = (container, message = "No se encontraron resultados.") => {
    container.innerHTML = `
        <div class="empty-state">
            <p class="empty-state__icon">📭</p>
            <p class="empty-state__message">${message}</p>
        </div>
    `;
};

// Error rojo debajo de un campo de formulario
export const showFieldError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    const existing = field.parentElement.querySelector(".field-error");
    if (existing) existing.remove();

    field.classList.add("input--error");

    const error = document.createElement("span");
    error.className = "field-error";
    error.textContent = message;
    field.parentElement.appendChild(error);
};

// Limpia el error de un campo
export const clearFieldError = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove("input--error");
    const error = field.parentElement.querySelector(".field-error");
    if (error) error.remove();
};