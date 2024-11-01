import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 1000, 
    headers: { 'Content-Type': 'application/json' },
});

export const getPosts = async () => {
    try {
        return await axiosInstance.get('/posts');
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
};

export const getPostById = async (id) => {
    try {
        return await axiosInstance.get(`/posts/${id}`);
    } catch (error) {
        throw new Error('Error fetching post: ' + error.message);
    }
};

export const getCommentsByPostId = async (id) => {
    try {
        return await axiosInstance.get(`/posts/${id}/comments`);
    } catch (error) {
        throw new Error('Error fetching comments: ' + error.message);
    }
};

export const getUserById = async (id) => {
    try {
        return await axiosInstance.get(`/users/${id}`);
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

export const createPost = async (post) => {
    try {
        return await axiosInstance.post('/posts', post);
    } catch (error) {
        throw new Error('Error creating post: ' + error.message);
    }
};

export const updatePost = async (id, post) => {
    try {
        return await axiosInstance.put(`/posts/${id}`, post);
    } catch (error) {
        throw new Error('Error updating post: ' + error.message);
    }
}

export const deletePost = async (id) => {
    try {
        return await axiosInstance.delete(`/posts/${id}`);
    } catch (error) {
        throw new Error('Error deleting post: ' + error.message);
    }
};
