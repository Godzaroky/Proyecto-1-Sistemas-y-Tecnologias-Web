import { API_BASE_URL } from "./utils/constants.js";

// GET - Listar posts con paginación
export const getPosts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error("Error al obtener los posts");
    return await response.json();
};

// GET - Obtener post por ID
export const getPostById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Error al obtener el post");
    return await response.json();
};

// GET - Buscar posts por texto
export const searchPosts = async (query) => {
    const response = await fetch(`${API_BASE_URL}/posts/search?q=${query}`);
    if (!response.ok) throw new Error("Error al buscar posts");
    return await response.json();
};

// GET - Posts por tag
export const getPostsByTag = async (tag) => {
    const response = await fetch(`${API_BASE_URL}/posts/tag/${tag}`);
    if (!response.ok) throw new Error("Error al filtrar por tag");
    return await response.json();
};

// GET - Lista de tags disponibles
export const getTags = async () => {
    const response = await fetch(`${API_BASE_URL}/posts/tags`);
    if (!response.ok) throw new Error("Error al obtener tags");
    return await response.json();
};

// GET - Usuario por ID (para mostrar nombre del autor)
export const getUserById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error("Error al obtener el usuario");
    return await response.json();
};

// POST - Crear post
export const createPost = async (data) => {
    const response = await fetch(`${API_BASE_URL}/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear el post");
    return await response.json();
};

// PUT - Editar post
export const updatePost = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar el post");
    return await response.json();
};

// DELETE - Eliminar post
export const deletePost = async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el post");
    return await response.json();
};