import React,{useState,useEffect,useContext} from "react";
import { useHistory } from "react-router";
import "./Write.css";
import axios from "axios";
import {BlogContext} from '../../Context/Context'

export default function Write() {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category,setCategory] = useState("")
    const [file, setFile] = useState(null);
    const { user, dispatch, isFetching,checkLoggedIn } = useContext(BlogContext);
    const userdetails = user ? user[0] : null
    useEffect(() => {
        checkLoggedIn()
            return () => {
            <></>
        }
    }, [])  
  const handleValue = () => {
      
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const category_array = category.trim().split(',');
    console.log(category_array)
    const newPost = {
      username: userdetails.username,
      title,
      description:desc,
      categories : category_array,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/upload`, data,{
            withCredentials : true
        });
      } catch (err) {console.log(err.response)}
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/create`, newPost,{
        withCredentials : true
      });
      history.push("/singlepost/" + res.data.savedPost._id);
    } catch (err) {console.log(err.response)}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          
        </div>
        <div className="writeFormGroup">
        <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
            <input
                type="text"
                placeholder="Type category seperated by comma(,)"
                className="writeInput"
                autoFocus={true}
                onChange={e=>setCategory(e.target.value)}
            />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onClick = {handleValue}
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

