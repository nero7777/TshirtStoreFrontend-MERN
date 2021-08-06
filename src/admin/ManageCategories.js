import React , {useState , useEffect}from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { deleteCategory, getAllCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const {user,token} = isAuthenticated();

    const [categories, setCategories] = useState([])

    const preload = () => {
        getAllCategories()
        .then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    

    const deletethisCategory = (categoryId) => {
        deleteCategory(categoryId,user._id,token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                preload();
            }
        })
    }
    return (
        <Base 
        title="Category Management"
        description="Manage all of your categories here"
        >
         <Link className="btn btn-info mb-2 rounded" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
        </Link>
            <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Current categories : {categories.length}</h2>
            {categories.map((cate,index) => {
               return ( <div className="row text-center mb-2 ">
                    <div className="col-6">
                        <h3 className="text-white text-left">{cate.name}</h3>
                    </div>
                     
                    <div className="col-3">
                        
                         <Link className="btn btn-success" to={`/admin/category/update/${cate._id}`}>Update</Link>
                    </div>
                    
                    <div className="col-3">
                        <button onClick={() => {deletethisCategory(cate._id)}} className="btn btn-danger">
                         Delete
                        </button>
                    </div>
                </div>)
            })}
          
        </div>
      </div>
     
        </Base>
    )
}

export default ManageCategories
