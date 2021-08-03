import Post from './Post'
import './Posts.css';

function Posts({posts}) {
    return (
        <div className='container-fluid allPosts'>
        {
            posts.length
            ?
            posts.map((post,index) => {
                return(
                   <Post key = {index} post = {post} />
                )
            })
            :
            <p>Loading ...</p>
        }
        </div>
    )
}

export default Posts
