import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    return (
        <Router>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand">
                        Examen técnico Frontend – React JS Marcos Ariel Ordoñez Jiménez
                    </span>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/new" element={<PostForm />} />
                <Route path="/posts/edit/:id" element={<PostForm />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
