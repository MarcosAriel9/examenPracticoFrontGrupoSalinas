import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

const POSTS_PER_PAGE = 15; 

function PostList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); 

    useEffect(() => {
        getPosts().then(response => setPosts(response.data));
    }, []);


    const startIndex = currentPage * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;


    const currentPosts = posts.slice(startIndex, endIndex);

 
    const handleNextPage = () => {
        if (endIndex < posts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Posts registrados</h1>
                <Link to="/posts/new" className="btn btn-primary">Crear Nuevo Post</Link>
            </div>
            <ul className="list-group">
                {currentPosts.map(post => (
                    <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <Link to={`/posts/edit/${post.id}`} className="btn btn-secondary btn-sm">Editar post</Link>
                    </li>
                ))}
            </ul>

            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    disabled={endIndex >= posts.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default PostList;
