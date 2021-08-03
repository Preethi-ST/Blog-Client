import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Category.css';
function Category() {
    const [category, setcategory] = useState([])
    useEffect(() => {
        const getcategories = async () => {
            await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/posts/allcategory`)
            .then(response => setcategory(response.data.category))
        }
        getcategories()
        return () => {
            <></>
        }
    }, [])
    return (
        <p className='text-center'>
            {
                category.length
                ?
                <>
                {
                    category.map((categories,index) => {
                        return(
                            <span className='mb-2' style={{display:'inline-block'}} key={index}>
                                <Link to={`?category=${categories}`} className="text-white rounded p-1">{categories}</Link>
                            </span>
                        )
                    })
                }
                </>
                :
                ''
            }
        </p>
    )
}

export default Category
