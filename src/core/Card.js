import React  , {useState , useEffect }from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper'


const Card = ({
    product,
    addToCart=true,
    removeFromCart=false,
    setReload = f => (f),
    reload=undefined
}) => {

    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count)

    const addtocart = () => {
        addItemToCart(product,() => {
            setRedirect(true)
        })
    }

    const getRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart"></Redirect>
        }
    }

    const showAddToCart = (addToCart) => {
       return addToCart && (
                <button
                    onClick={addtocart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                  </button>
       ) 
    }
    const showRemoveFromCart = (removeFromCart) => {
        return   removeFromCart && (
                    <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)}
                        }
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
        ) 
    }

        return (
          <div className="card text-white bg-dark border border-info mt-2 mb-4">
            <div className="card-header lead mt-1">{product.name}</div>
            <div className="card-body">
            {getRedirect(redirect)}
              <ImageHelper 
                  product={product}
              />
              <p className="lead bg-success font-weight-normal text-wrap">
               {product.description}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {product.price}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addToCart)}
                </div>
                <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };




export default Card
