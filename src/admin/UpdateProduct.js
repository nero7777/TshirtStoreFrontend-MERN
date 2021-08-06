import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateProduct , getAProduct ,getAllCategories} from "./helper/adminapicall";


export default function UpdateProduct({ history , match }) {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: false,
        createdProduct: "",
        isRedirect: false,
        formData: "",
    });

    const {
        name,
        price,
        description,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        updatedProduct,
        isRedirect,
        formData,
    } = values;
    // const [product ,setProduct] = useState({});

    const { user, token } = isAuthenticated();

    useEffect(() => {
        getProduct(match.params.productId);
    }, [])

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ categories: data ,formData:new FormData()}) //if you pass ...values code fails 
            }
        })
    }

    const getProduct = (productId) =>{
        getAProduct(productId).then(data => {
            console.log(data);
            if(data.error){
                    console.log(data.error);
            }else{
                getCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    stock: data.stock,
                    price: data.price,
                    formData : new FormData()
                })
            }
        })

    }

    const updateProductForm = () => (
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
          Update Product
        </button>
      </form>
  )

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value); //set form data and then pass to db
        setValues({ ...values, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        updateProduct(match.params.productId,user._id, token, formData) //passing form data to backend
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        stock: '',
                        price: '',
                        loading: false,
                        error: false,
                        isRedirect: true,
                        updatedProduct: data.name
                    })
                }
            })
    }

    const errorMessage = () => {
        return <div className='alert alert-danger mt-2' style={{ display: !error && 'none' }}>
            {error}
        </div>
    }

    const successMessage = () => {
        return <div className='alert alert-success mt-2' style={{ display: !updatedProduct && 'none' }}>
            {updatedProduct} updated Successfully
    </div>
    }
    return (
        <Base
            title="Update Product"
            description="Update product here"
            className="container bg-info p-4"
        >
            <Link
                to="/admin/dashboard"
                className="btn btn-md bg-dark text-white mb-2"
            >
                Admin Dashboard
      </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                    {updateProductForm()}
                    {isRedirect && setTimeout(() => {
                        history.push('/admin/dashboard');
                    }, 2000)}
                </div>
            </div>
        </Base>
    );
}