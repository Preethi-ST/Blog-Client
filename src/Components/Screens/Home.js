import React, { useState,useEffect } from 'react'
import './Home.css';
import Category from './Category';
import Posts from './Posts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function Home() {
    const [posts,setPosts] = useState([])
    const location = useLocation()

    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/allpost${location.search}`)
            .then(response => setPosts(response.data.posts))
        }
        fetchPosts()
        return () => {
            <></>
        }
    }, [location.search])
    return (
        <div >
        <div className="jumbotron p-2 homeImgSetting content-center" style={{marginTop:'60px'}}> 
            <p className="display-5 logo-text"><span className='display-4'>Welcome to Blogzoid</span></p>
            <h3 className="text-info">Publish your passions, your way</h3>
            <p className="lead text-info">Create a unique and beautiful blog. It’s easy and free.</p>
        </div>
        <Category />
        <Posts posts = {posts} />
        </div>
    )
}

export default Home
