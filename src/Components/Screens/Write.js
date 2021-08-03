import React,{useState,useEffect,useContext} from "react";
import { useHistory } from "react-router";
import "./Write.css";
import axios from "axios";
import {BlogContext} from '../../Context/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Write() {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category,setCategory] = useState("")
    const [file, setFile] = useState(null);

    const { user,checkLoggedIn } = useContext(BlogContext);
    const userdetails = user ? user[0] : null

    /*****    Img upload related state and functions     ******/
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();


    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    };
    
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      };
    };
    const uploadImage = async (base64EncodedImage) => {
      try {
        const datas = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/upload`,{
          data: base64EncodedImage
        })
        setFile(datas.data.image_url)
        setFileInputState('');
        setPreviewSource('');
        toast.success('Image uploaded successfully');
        return datas.data.image_url
        }catch (err) {
          console.error(err);
          alert('Something went wrong!');
        }  
    };
    /*****    Img upload related state and functions     ******/


    useEffect(() => {
      checkLoggedIn()
      return () => {
        <></>
      }
    }, [])  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.warning('Uploading data..! Please wait for a while',{
      position: "top-right",
      autoClose: 7000
    });

    /* Save category as an array in Database */
    const category_array = category.trim().split(',');
    const newPost = {
      username: userdetails.username,
      title,
      description:desc,
      categories : category_array,
    };

    if (!selectedFile) return;

    /* Setup to upload images in cloudinary */
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    let img_url;

    reader.onloadend = async () => {
      img_url = await uploadImage(reader.result);
      newPost.photo = img_url;
      /* After Img upload save the image url and other post details in Database */
      try {
        const res = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/create`, newPost,{
          withCredentials : true
        });
        history.push("/singlepost/" + res.data.savedPost._id);
      } catch (err) {console.log(err.response)}
    };

    reader.onerror = () => {
      toast.error('something went wrong! Make sure if you have proper internet connection!',{
        position: "top-right",
        autoClose: 5000
      });
    };

  };
  return (
    <div className="write">
      <ToastContainer /> 

      {previewSource && (
        <img
          src={previewSource}
          alt="chosen"
          style={{ height: '350px',marginLeft : '20px' }}
        />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>

        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
            style={{display:'none'}}
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

