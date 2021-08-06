import React , {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { createProduct, getAllCategories } from './helper/adminapicall';


const AddProduct = () => {

  const {user,token} = isAuthenticated();

    const [values, setValues] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo : "",
        categories : [],
        category : "",
        loading : false,
        error : "",
        createdProduct : "",
        getaRedirect : false,
        formData : ""
    })

    const {name,description,price,stock,categories,category,loading,error,createdProduct,getaRedirect,formData} = values;

    const preload = () => {
      getAllCategories().then(data => {
        
        if(data.error){
          setValues({...values,error:data.error})
        }else{
          setValues({...values,categories:data,formData:new FormData()})
          console.log("cate",categories)
        }
      });
    };

    useEffect(() => {
      preload()
    }, [])

    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value
      formData.set(name,value);
      setValues({...values,[name] : value})
  }

    const onSubmit = event => {
      console.log(formData)
        event.preventDefault();
        setValues({...values,error : "",loading:true})
        createProduct(user._id,token,formData)
        .then(data => {
          if(data.error){
            setValues({...values,error : data.error})
          }else{
            setValues({
              ...values,
              name : "",
              description : "",
              price : "",
              photo : "",
              stock : "",
              loading : false,
              createdProduct : data.name,
              getaRedirect:true})
          }
        })
    }
    
    

    const createProductForm = () => (
        <form className="my-2" >
          <span>Post photo</span>
          <div className="form-group mt-2">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mt-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ) )}
            </select>
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-2">
            Create Product
          </button>
        </form>
    )

    const successMessage = () => {
     return <div className="alert alert-success mt-3"
      style={{display : createdProduct ? "" : "none"}}
     >
     <h4>{createProduct} created sucessfully !!</h4>
      </div>
    }
    
    const warningMessage = () => {
     return <div className="alert alert-warning mt-3"
     style={{display : error ? "" : "none"}}
     >
      <h4>{createProduct} creation failed !!</h4>
      </div>
    }

    return (
        <Base 
            title="Add a Product Here!!"
            description="Welcome to product creation section"
            className="container bg-info p-4"
        >
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                </div>
            </div>

            <Link to="/admin/dashboard" className="btn btn-md btn-dark mt-4">Admin Home</Link>
        </Base>
    )
}

export default AddProduct
