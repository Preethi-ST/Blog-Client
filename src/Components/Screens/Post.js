import React from 'react'
import { Link } from 'react-router-dom';
import './Post.css'

function Post({post}) {
    return (
        <div className="card border-gradient border-gradient-purple">
        <img className="card-img-top" src={post.photo} alt="Card image cap"/>
        <div className="card-body">
            <Link to={`/singlepost/${post._id}`}>
                <h5 className="card-title text-center text-info">{post.title}</h5>
            </Link>
            <p className='logo-text text-center'>
                {post.categories.map((c,index) => (
                <Link to={`?category=${c}`} key={index}>
                    <span key={index}>{c}</span>
                </Link>
            ))}
            </p>
            <h6 className="card-subtitle mb-2 text-muted text-center">{new Date(post.createdAt).toDateString()}</h6>
            <Link to={`/singlepost/${post._id}`}>
                <p className="card-text cut-text">{post.description}</p>
            </Link>
        </div>
    </div>
    )
}

export default Post
