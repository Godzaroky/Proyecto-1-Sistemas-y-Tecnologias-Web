import { createPost } from "../api.js";
import { showToast } from "../ui.js";
import { validatePostForm } from "../validation.js";

export const renderCreate = (container) => {
    container.innerHTML = `
        <section class="form-view">
            <a href="#/" class="btn btn--secondary">← Volver</a>

            <h2>Crear publicación</h2>

            <form class="form" id="create-form">
                <div class="form__group">
                    <label for="title">Título</label>
                    <input type="text" id="title" class="input" placeholder="Título del post" />
                </div>

                <div class="form__group">
                    <label for="body">Contenido</label>
                    <textarea id="body" class="input" rows="6" placeholder="Escribe el contenido aquí..."></textarea>
                </div>

                <div class="form__group">
                    <label for="author">Autor</label>
                    <input type="text" id="author" class="input" placeholder="Nombre del autor" />
                </div>

                <div class="form__actions">
                    <button type="submit" class="btn btn--primary">Publicar</button>
                    <a href="#/" class="btn btn--secondary">Cancelar</a>
                </div>
            </form>
        </section>
    `;

    bindEvents();
};

const bindEvents = () => {
    document.getElementById("create-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const fields = {
            title: document.getElementById("title").value,
            body: document.getElementById("body").value,
            author: document.getElementById("author").value,
        };

        if (!validatePostForm(fields)) return;

        const submitBtn = document.querySelector("#create-form button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Publicando...";

        try {
            await createPost({
                title: fields.title.trim(),
                body: fields.body.trim(),
                userId: 1,
            });

            showToast("Post creado correctamente.");
            setTimeout(() => {
                window.location.hash = "#/";
            }, 1000);

        } catch (error) {
            showToast("Error al crear el post.", "error");
            submitBtn.disabled = false;
            submitBtn.textContent = "Publicar";
        }
    });
};