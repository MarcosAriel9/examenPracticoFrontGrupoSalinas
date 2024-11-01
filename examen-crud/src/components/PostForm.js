import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createPost, getPostById, updatePost } from '../services/api';

function PostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
     
        if (id) {
            getPostById(id).then(response => {
                setTitle(response.data.title);
                setBody(response.data.body);
            }).catch(error => {
                console.error('Error fetching post:', error);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, body };

        const apiCall = id ? updatePost(id, post) : createPost(post);

        apiCall.then(() => {
            navigate('/');
        }).catch(error => {
            console.error('Error saving post:', error);
        });
    };

    return (
        <div className="container mt-5">
            <h1>{id ? 'Editar post' : 'Agregar nuevo post'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contenido</label>
                    <textarea 
                        className="form-control" 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary me-2">
                        {id ? 'Actualizar' : 'Crear'}
                    </button>
                    <Link to="/" className="btn btn-secondary">
                    Regresar a los posts
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default PostForm;
