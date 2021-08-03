import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams,useHistory } from "react-router";
import { Link } from "react-router-dom";
import { BlogContext } from "../../Context/Context";
import "./SinglePost.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SinglePost() {

    const {user} = useContext(BlogContext)
    const userdetails = user ? user[0] : null

    const postid = useParams()
    const history = useHistory()

    const [post, setPost] = useState({});
    const [posttitle,setPostTitle] = useState('')
    const [postdesc,setPostdesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false);
 
    useEffect(() => {
        const getSinglePost = async () => {
            const result = await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/single/${postid.postId}`)
            setPost(result.data.post)
            setPostTitle(result.data.post.title)
            setPostdesc(result.data.post.description)
        }
        getSinglePost()
        return () => {
            <></>
        }
    }, [postid])

    const handleUpdate = async () => {
        try{
            const result = await axios.put(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/update/${post._id}`,{
                username : userdetails.username,
                title : posttitle,
                description : postdesc
            },{
                withCredentials : true   /* For cookies request */
            })

            setPost(result.data.updatedPost)
            setUpdateMode(false)
            toast.success('Post Updated Successfully',{
                position: "top-right",
                autoClose: 5000
            })
        }catch(error){
            console.log(error.response)
        }
    }

    const deleteHandler = async () => {
        try{
            const result = await axios.delete(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/remove/${post._id}`,{
                data: { username: userdetails.username }
            },{
                withCredentials : true
            })

            toast.success('Deleted Successfully',{
                position: "top-right",
                autoClose: 2000
            })

            setTimeout(() => {
                history.push('/homepage')
            }, 2100);

        }catch(error){
            toast.error('Something went wrong',{
                position: "top-right",
                autoClose: 4000
            })
        }
    }
    return (
        <>
        <ToastContainer />
        {
            post
            ?
            <div class="card post border-0" style={{color : 'rgb(6, 86, 139)'}}>
                <img class="card-img-top" src={post.photo} alt="image" />

                <div class="card-body">
                    <h5 class="card-title py-4">
                        {
                            updateMode
                            ?
                            (
                                <input
                                    type="text"
                                    value={posttitle}
                                    className="singlePostTitleInput"
                                    autoFocus
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                            )
                            :
                            <>
                            <p className='float-left'>{post.title}</p>
                            {
                                post.username === userdetails?.username && (
                                    <p className='float-right text-warning'>
                                        <span onClick={()=>setUpdateMode(true)}><i class="fad fa-file-edit"></i></span>
                                        
                                        <span onClick = {deleteHandler}><i class="fad fa-trash"></i></span>
                                    </p>
                                )
                            }
                            </>
                        }
                        
                    </h5>

                    <div className='mb-4'>
                        <p style={{display:'inline-block'}}>
                            Author :
                            <span>
                                <Link to={`/homepage?user=${post.username}`} className='author'>{post.username}</Link>
                            </span>
                        </p>
                        <p className='float-right' style={{display:'inline-block'}}>
                            edited {new Date(post.createdAt).toDateString()}
                        </p>
                    </div>

                    <div className = 'mt-5'>

                        {updateMode ? (
                            <textarea
                                className="singlePostDescInput"
                                value={postdesc}
                                onChange={(e) => setPostdesc(e.target.value)}
                            />
                            ) : (
                            <p className="singlePostDesc"><pre>{postdesc}</pre></p>
                        )}

                        {updateMode && (
                        <>
                            <span>
                                <button className="btn btn-info" onClick={handleUpdate}>
                                    Update
                                </button>
                            </span>
                            <span>
                                <button className="btn btn-danger" onClick={() => setUpdateMode(false)}>
                                    cancel
                                </button>
                            </span>
                        </>
                        )}
                        
                    </div>
                </div>
            </div>
            :
            <div className = 'container justify-content-center'>
                Loading ...
            </div>
        }
        </>
    )
}

export default SinglePost
