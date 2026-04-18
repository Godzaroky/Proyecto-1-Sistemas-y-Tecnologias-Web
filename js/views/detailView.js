import { getPostById, getUserById, deletePost } from "../api.js";
import { showSpinner, showError, showToast } from "../ui.js";
import { getLocalPost, deleteLocalPost, isLocalPost } from "../store.js";

export const renderDetail = async (container, id, overrideData = null) => {
    showSpinner(container);

    try {
        let post;
        let user;

        if (overrideData) {
            // Datos pasados directamente (e.g. después de editar)
            post = overrideData;
        } else {
            // Verificar estado local primero
            const localData = getLocalPost(id);

            if (localData && localData._deleted) {
                showError(container, "Este post ha sido eliminado.");
                return;
            } else if (localData && !localData._override) {
                // Post creado localmente (tiene todos los datos)
                post = localData;
            } else {
                // Obtener de la API
                post = await getPostById(id);
                // Aplicar overrides locales si existen
                if (localData && localData._override) {
                    const { _override, ...overrides } = localData;
                    post = { ...post, ...overrides };
                }
            }
        }

        // Determinar el nombre del autor
        let authorName;
        if (post._authorName) {
            authorName = post._authorName;
        } else {
            try {
                user = await getUserById(post.userId);
                authorName = `${user.firstName} ${user.lastName}`;
            } catch (_) {
                authorName = `Usuario ${post.userId}`;
            }
        }

        container.innerHTML = `
            <section class="detail">
                <a href="#/" class="btn btn--secondary">← Volver</a>

                <article class="detail__card">
                    <h2 class="detail__title">${post.title}</h2>

                    <div class="detail__meta">
                        <span>Autor: ${authorName}</span>
                        <span>Vistas: ${post.views}</span>
                        <span>Likes: ${post.reactions.likes}</span>
                        <span>Dislikes: ${post.reactions.dislikes}</span>
                    </div>

                    <p class="detail__body">${post.body}</p>

                    <div class="detail__tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                </article>

                <div class="detail__actions">
                    <button id="edit-btn" class="btn btn--primary">Editar</button>
                    <button id="delete-btn" class="btn btn--danger">Eliminar</button>
                </div>

                <div id="confirm-delete" class="confirm-box hidden">
                    <p>¿Estás seguro que quieres eliminar este post?</p>
                    <div>
                        <button id="confirm-yes" class="btn btn--danger">Sí, eliminar</button>
                        <button id="confirm-no" class="btn btn--secondary">Cancelar</button>
                    </div>
                </div>
            </section>
        `;

        bindEvents(container, id);

    } catch (error) {
        showError(container);
    }
};

const bindEvents = (container, id) => {
    document.getElementById("edit-btn").addEventListener("click", () => {
        window.location.hash = `#/post/${id}/edit`;
    });

    document.getElementById("delete-btn").addEventListener("click", () => {
        document.getElementById("confirm-delete").classList.remove("hidden");
    });

    document.getElementById("confirm-no").addEventListener("click", () => {
        document.getElementById("confirm-delete").classList.add("hidden");
    });

    document.getElementById("confirm-yes").addEventListener("click", async () => {
        try {
            // Solo llamar a la API si el post existe en el servidor (no es local)
            if (!isLocalPost(id)) {
                await deletePost(id);
            }

            // Marcar como eliminado localmente
            deleteLocalPost(id);

            showToast("Post eliminado correctamente.");

            // Limpia el contenido del detalle inmediatamente
            container.innerHTML = `
                <div class="empty-state">
                    <p class="empty-state__message">Post eliminado. Redirigiendo...</p>
                </div>
            `;

            setTimeout(() => {
                window.location.hash = "#/";
            }, 1000);

        } catch (error) {
            showToast("Error al eliminar el post.", "error");
        }
    });
};