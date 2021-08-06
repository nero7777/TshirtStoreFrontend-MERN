import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { updateCategory , getACategory} from './helper/adminapicall';

export default function UpdateCategory({match}) {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    // const [category,setCategory] = useState({});
    const {user,token} = isAuthenticated();

    useEffect(()=>{
        getThisCategory(match.params.categoryId)
    },[]);

const getThisCategory = (categoryId) =>{
    getACategory(categoryId).then(data => {
        console.log(data);
        if(data.error){
            console.log(data.error);
        }else{
            setName(data.name);
        }
    })
}
    const updateCategoryForm = () => {
        return <form className='p-3'>
        <div className='form-group col-9'>
           <label>Update Name of Category</label>
            <input className='form-control' value={name} onChange={handleChange}/>
        </div>    
        <button className='btn btn-sm bg-success text-white' onClick={onSubmit}>Update Category</button><br />
        <Link to='/admin/dashboard' className='btn btn-sm bg-warning text-white mt-3'>Admin Dashboard</Link>
    </form>
    }
    const handleChange = (event) =>{
            setName(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data => {
            console.log(data);
            if(data.error){
                setError(error);
                setSuccess(false);
            }else{
                setName('');
                setSuccess(true);
            }
        })
    }
const errorMessage = () => {
    return <h4 className='text-warning' style={{display : !error && "none" }}>{error}</h4>
}
const successMessage = () => {
    return <h4 className='text-success' style={{display : !success && "none" }}>Successfully updated category</h4>
}
    return (
        <Base title='Create Category Here' description='you can create your category here' className='container bg-info'>
       {errorMessage()}
       {successMessage()}
        {updateCategoryForm()}
        </Base>
    )
}