import { getPostById, updatePost } from "../api.js";
import { showSpinner, showError, showToast } from "../ui.js";
import { validatePostForm } from "../validation.js";
import { renderDetail } from "./detailView.js";
import { getLocalPost, updateLocalPost, isLocalPost } from "../store.js";

export const renderEdit = async (container, id) => {
    showSpinner(container);

    try {
        // Verificar si existe un override local (post creado o editado localmente)
        const localData = getLocalPost(id);

        let post;
        if (localData && localData._deleted) {
            showError(container, "Este post ha sido eliminado.");
            return;
        } else if (localData && !localData._override) {
            // Es un post creado localmente (tiene todos los datos)
            post = localData;
        } else {
            // Obtener de la API y aplicar overrides locales
            post = await getPostById(id);
            if (localData && localData._override) {
                const { _override, ...overrides } = localData;
                post = { ...post, ...overrides };
            }
        }

        const authorValue = post._authorName || `Usuario ${post.userId}`;

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
                        <input type="text" id="author" class="input" value="${authorValue}" />
                    </div>

                    <div class="form__actions">
                        <button type="submit" class="btn btn--primary">Guardar cambios</button>
                        <a href="#/post/${id}" class="btn btn--secondary">Cancelar</a>
                    </div>
                </form>
            </section>
        `;

        bindEvents(container, id, post);

    } catch (error) {
        showError(container);
    }
};

const bindEvents = (container, id, originalPost) => {
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
            // Solo llamar a la API si el post existe en el servidor (no es local)
            if (!isLocalPost(id)) {
                await updatePost(id, {
                    title: fields.title.trim(),
                    body: fields.body.trim(),
                });
            }

            // Guardar los cambios localmente para que persistan
            updateLocalPost(id, {
                title: fields.title.trim(),
                body: fields.body.trim(),
                _authorName: fields.author.trim(),
            });

            // Construir el post actualizado para mostrar inmediatamente
            const updatedPost = {
                ...originalPost,
                title: fields.title.trim(),
                body: fields.body.trim(),
                _authorName: fields.author.trim(),
            };

            showToast("Post actualizado correctamente.");
            setTimeout(() => {
                history.replaceState(null, "", `#/post/${id}`);
                renderDetail(container, id, updatedPost);
            }, 1000);

        } catch (error) {
            showToast("Error al actualizar el post.", "error");
            submitBtn.disabled = false;
            submitBtn.textContent = "Guardar cambios";
        }
    });
};