import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

function AddCategory() {
    
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAuthenticated();

    //changehandler
    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }
    //clickhandler
    const onsubmit = (event) => {
        event.preventDefault();
        setError("")
        setSuccess(false)
        //fire request to backend via fetch req in createcategory method
        createCategory(user._id,token,{name})
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError(false)
                setSuccess(true)
                setName("") 
            }
        })
    }

    //Success alert
    const successMessage = () => {
        if(success){
            return <h4 className="text-success mt-2 bg-success text-white p-1 rounded">Category created Successfully!!</h4>
        }
    }
    //Warning alert
    const warningMessage = () => {
        if(error){
            return <h4 className="text-warning mt-2">Failed to CreateCategory!!</h4>
        }
    }

    const CategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead mt-1"> Enter Category Name</p>
                <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex. Summer" onChange={handleChange} value={name} />
                <button className="btn btn-info  px-3" onClick={onsubmit}>Create</button>
                <button className="btn btn-success px-4 d-block my-2"><Link to="/admin/dashboard" className="text-white" style={{textDecoration:"none"}}>Admin Home</Link></button>
            </div>
        </form>
    )

    return (
        <Base title="Create Category" description="Add new Category for upcoming Arrivals" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMessage()}
                {warningMessage()}
                    {CategoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
