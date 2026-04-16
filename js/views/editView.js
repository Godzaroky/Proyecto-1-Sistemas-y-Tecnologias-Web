import { getPostById, updatePost } from "../api.js";
import { showSpinner, showError, showToast } from "../ui.js";
import { validatePostForm } from "../validation.js";

export const renderEdit = async (container, id) => {
    showSpinner(container);

    try {
        const post = await getPostById(id);

        container.innerHTML = `
            <section class="form-view">
                <a href="#/post/${id}" class="btn btn--secondary">← Volver</a>

                <h2>Editar publicación</h2>

                <form class="form" id="edit-form">
                    <div class="form__group">
                        <label for="title">Título</label>
                        <input type="text" id="title" class="input" value="${post.title}" />
                    </div>

                    <div class="form__group">
                        <label for="body">Contenido</label>
                        <textarea id="body" class="input" rows="6">${post.body}</textarea>
                    </div>

                    <div class="form__group">
                        <label for="author">Autor</label>
                        <input type="text" id="author" class="input" value="Usuario ${post.userId}" />
                    </div>

                    <div class="form__actions">
                        <button type="submit" class="btn btn--primary">Guardar cambios</button>
                        <a href="#/post/${id}" class="btn btn--secondary">Cancelar</a>
                    </div>
                </form>
            </section>
        `;

        bindEvents(id);

    } catch (error) {
        showError(container);
    }
};

const bindEvents = (id) => {
    document.getElementById("edit-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const fields = {
            title: document.getElementById("title").value,
            body: document.getElementById("body").value,
            author: document.getElementById("author").value,
        };

        if (!validatePostForm(fields)) return;

        const submitBtn = document.querySelector("#edit-form button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Guardando...";

        try {
            await updatePost(id, {
                title: fields.title.trim(),
                body: fields.body.trim(),
            });

            showToast("Post actualizado correctamente.");
            setTimeout(() => {
                window.location.hash = `#/post/${id}`;
            }, 1000);

        } catch (error) {
            showToast("Error al actualizar el post.", "error");
            submitBtn.disabled = false;
            submitBtn.textContent = "Guardar cambios";
        }
    });
};