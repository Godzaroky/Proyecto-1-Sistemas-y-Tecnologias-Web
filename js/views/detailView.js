import { getPostById, getUserById, deletePost } from "../api.js";
import { showSpinner, showError, showToast } from "../ui.js";

export const renderDetail = async (container, id) => {
    showSpinner(container);

    try {
        const post = await getPostById(id);
        const user = await getUserById(post.userId);

        container.innerHTML = `
            <section class="detail">
                <a href="#/" class="btn btn--secondary">← Volver</a>

                <article class="detail__card">
                    <h2 class="detail__title">${post.title}</h2>

                    <div class="detail__meta">
                        <span>Autor: ${user.firstName} ${user.lastName}</span>
                        <span>Vistas: ${post.views}</span>
                        <span>Likes: ${post.reactions.likes}</span>
                        <span>Dislikes: ${post.reactions.dislikes}</span>
                    </div>

                    <p class="detail__body">${post.body}</p>

                    <div class="detail__tags">
                        ${post.tags.map(tag => <span class="tag">${tag}</span>).join("")}
                    </div>
                </article>

                <div class="detail__actions">
                    <button id="edit-btn" class="btn btn--primary">Editar</button>
                    <button id="delete-btn" class="btn btn--danger">Eliminar</button>
                </div>

                <div id="confirm-delete" class="confirm-box hidden">
                    <p>¿Estás seguro que quieres eliminar este post?</p>
                    <button id="confirm-yes" class="btn btn--danger">Sí, eliminar</button>
                    <button id="confirm-no" class="btn btn--secondary">Cancelar</button>
                </div>
            </section>
        `;

        bindEvents(id);

    } catch (error) {
        showError(container);
    }
};

const bindEvents = (id) => {
    document.getElementById("edit-btn").addEventListener("click", () => {
        window.location.hash = #/post/${id}/edit;
    });

    document.getElementById("delete-btn").addEventListener("click", () => {
        document.getElementById("confirm-delete").classList.remove("hidden");
    });

    document.getElementById("confirm-no").addEventListener("click", () => {
        document.getElementById("confirm-delete").classList.add("hidden");
    });

    document.getElementById("confirm-yes").addEventListener("click", async () => {
        try {
            await deletePost(id);
            showToast("Post eliminado correctamente.");
            setTimeout(() => {
                window.location.hash = "#/";
            }, 1000);
        } catch (error) {
            showToast("Error al eliminar el post.", "error");
        }
    });
};