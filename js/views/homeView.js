import { getPosts, searchPosts, getPostsByTag, getTags } from "../api.js";
import { showSpinner, showError, showEmpty } from "../ui.js";
import { truncate } from "../utils/helpers.js";
import { POSTS_PER_PAGE } from "../utils/constants.js";

let currentPage = 1;
let currentTag = "";
let currentSearch = "";

export const renderHome = async (container) => {
    showSpinner(container);

    try {
        const tags = await getTags();
        await loadPosts(container, tags);
    } catch (error) {
        showError(container);
    }
};

const loadPosts = async (container, tags) => {
    try {
        let data;

        if (currentSearch) {
            data = await searchPosts(currentSearch);
        } else if (currentTag) {
            data = await getPostsByTag(currentTag);
        } else {
            data = await getPosts(currentPage, POSTS_PER_PAGE);
        }

        if (!data.posts || data.posts.length === 0) {
            showEmpty(container);
            return;
        }

        container.innerHTML = `
            <section class="home">
                <div class="filters">
                    <input
                        type="text"
                        id="search"
                        class="input"
                        placeholder="Buscar por título o contenido..."
                        value="${currentSearch}"
                    />
                    <select id="tag-filter" class="input">
                        <option value="">Todos los tags</option>
                        ${tags.map(tag => `
                            <option value="${tag.slug}" ${currentTag === tag.slug ? "selected" : ""}>
                                ${tag.name}
                            </option>
                        `).join("")}
                    </select>
                    <button id="clear-filters" class="btn btn--secondary">Limpiar filtros</button>
                </div>

                <div class="posts-grid">
                    ${data.posts.map(post => `
                        <article class="card" data-id="${post.id}">
                            <h3 class="card__title">${post.title}</h3>
                            <p class="card__body">${truncate(post.body)}</p>
                            <div class="card__footer">
                                <span class="card__views">👁 ${post.views} vistas</span>
                                <div class="card__tags">
                                    ${post.tags.map(t => `<span class="tag">${t}</span>`).join("")}
                                </div>
                                <button class="btn btn--primary btn-detail" data-id="${post.id}">
                                    Ver detalle
                                </button>
                            </div>
                        </article>
                    `).join("")}
                </div>

                ${!currentSearch && !currentTag ? `
                    <div class="pagination">
                        <button id="prev" class="btn btn--secondary" ${currentPage === 1 ? "disabled" : ""}>
                            ← Anterior
                        </button>
                        <span>Página ${currentPage}</span>
                        <button id="next" class="btn btn--secondary" ${data.posts.length < POSTS_PER_PAGE ? "disabled" : ""}>
                            Siguiente →
                        </button>
                    </div>
                ` : ""}
            </section>
        `;

        bindEvents(container, tags);

    } catch (error) {
        showError(container);
    }
};

const bindEvents = (container, tags) => {
    // Detalle de post
    container.querySelectorAll(".btn-detail").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.hash = `#/post/${btn.dataset.id}`;
        });
    });

    // Búsqueda
    const searchInput = document.getElementById("search");
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = e.target.value.trim();
            currentTag = "";
            currentPage = 1;
            loadPosts(container, tags);
        }, 400);
    });

    // Filtro por tag
    document.getElementById("tag-filter").addEventListener("change", (e) => {
        currentTag = e.target.value;
        currentSearch = "";
        currentPage = 1;
        loadPosts(container, tags);
    });

    // Limpiar filtros
    document.getElementById("clear-filters").addEventListener("click", () => {
        currentSearch = "";
        currentTag = "";
        currentPage = 1;
        loadPosts(container, tags);
    });

    // Paginación
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentPage--;
            loadPosts(container, tags);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentPage++;
            loadPosts(container, tags);
        });
    }
};