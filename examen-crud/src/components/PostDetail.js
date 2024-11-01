import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, getCommentsByPostId, getUserById, deletePost } from '../services/api';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getPostById(id)
            .then(response => {
                setPost(response.data);
                return getUserById(response.data.userId); 
            })
            .then(res => setUser(res.data))
            .catch(error => {
                console.error('Error fetching post or user:', error);
            });

        getCommentsByPostId(id)
            .then(response => setComments(response.data))
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
            deletePost(id)
                .then(() => {
                    alert('Publicación eliminada con éxito.');
                  
                    window.location.href = '/'; 
                })
                .catch(error => {
                    console.error('Error eliminando el post:', error);
                    alert('Ocurrió un error al eliminar la publicación.');
                });
        }
    };

    if (!post) return <p>Cargando ...</p>;

    return (
        <div className="container mt-5">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            {user && (
                <div className="mt-3">
                    <h5>Información de usuario:</h5>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Dirección:</strong> {user.address.street}, {user.address.city}</p>
                </div>
            )}
            <h5 className="mt-4">Comentarios:</h5>
            <ul className="list-group">
                {comments.map(comment => (
                    <li key={comment.id} className="list-group-item">
                        <strong>{comment.name}</strong>: {comment.body}
                    </li>
                ))}
            </ul>


            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-danger me-2" onClick={handleDelete}>
                    Eliminar Publicación
                </button>
                <div>
                    <Link to={`/posts/edit/${id}`} className="btn btn-secondary me-2">Editar post</Link>
                    <Link to="/" className="btn btn-primary">Regresar a los post</Link>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
