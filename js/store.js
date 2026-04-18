// store.js — Estado local para persistir cambios que DummyJSON no guarda en el servidor.
// DummyJSON simula POST/PUT/DELETE pero no los persiste.

const STORAGE_KEY = "blog_local_store";

const getStore = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (_) { /* ignore */ }
    return { created: [], updated: {}, deleted: [] };
};

const saveStore = (store) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

// --- Verificar si un post fue creado localmente ---
export const isLocalPost = (id) => {
    const store = getStore();
    return store.created.some(p => p.id === Number(id));
};

// --- CREAR ---
export const addLocalPost = (post) => {
    const store = getStore();
    store.created.unshift(post); // más reciente primero
    saveStore(store);
};

// --- EDITAR ---
export const updateLocalPost = (id, data) => {
    const store = getStore();
    const numId = Number(id);

    // Si es un post creado localmente, actualizar directamente en created[]
    const createdIdx = store.created.findIndex(p => p.id === numId);
    if (createdIdx !== -1) {
        store.created[createdIdx] = { ...store.created[createdIdx], ...data };
    } else {
        // Es un post de la API, guardamos el override
        store.updated[numId] = { ...(store.updated[numId] || {}), ...data };
    }

    saveStore(store);
};

// --- ELIMINAR ---
export const deleteLocalPost = (id) => {
    const store = getStore();
    const numId = Number(id);

    // Si fue creado localmente, simplemente quitarlo de created[]
    const createdIdx = store.created.findIndex(p => p.id === numId);
    if (createdIdx !== -1) {
        store.created.splice(createdIdx, 1);
    } else {
        // Es un post de la API, marcarlo como eliminado
        if (!store.deleted.includes(numId)) {
            store.deleted.push(numId);
        }
        // Limpiar posibles edits
        delete store.updated[numId];
    }

    saveStore(store);
};

// --- OBTENER un post por ID (local override o null) ---
export const getLocalPost = (id) => {
    const store = getStore();
    const numId = Number(id);

    // ¿Está eliminado?
    if (store.deleted.includes(numId)) return { _deleted: true };

    // ¿Es un post creado localmente?
    const created = store.created.find(p => p.id === numId);
    if (created) return created;

    // ¿Tiene ediciones?
    if (store.updated[numId]) return { _override: true, ...store.updated[numId] };

    return null;
};

// --- APLICAR cambios locales a una lista de posts de la API ---
export const applyLocalChanges = (posts) => {
    const store = getStore();

    // Filtrar eliminados
    let result = posts.filter(p => !store.deleted.includes(p.id));

    // Aplicar ediciones
    result = result.map(p => {
        if (store.updated[p.id]) {
            return { ...p, ...store.updated[p.id] };
        }
        return p;
    });

    return result;
};

// --- Obtener posts creados localmente ---
export const getLocalCreatedPosts = () => {
    const store = getStore();
    return store.created;
};
