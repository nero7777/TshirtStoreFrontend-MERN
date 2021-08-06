import React , {useState , useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'
import Card from './Card'
import { getAllProducts } from './helper/coreapicalls'
import { loadCart } from './helper/CartHelper'
import StripeCheckout from './StripeCheckout'


function Cart() {

    const [products, setProducts] = useState([]);

    const [reload, setReload] = useState(false);

    useEffect(() => {
       setProducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
       return <div>
           <h2 className="mb-2">{products.length} items in Cart</h2>
           {products.map((product,index) => {
               return <Card
               key={index}
               product={product}
               removeFromCart={true}
               addToCart={false}
               setReload={setReload}
               reload={reload}
            >

               </Card>
           })}
       </div>
    }
    const loadCheckout = () => {
       return <div>
           <h2 className="mb-2">Checkout  Here!!</h2>
       </div>
    }

  
    return (
        <Base title="Cart" description="Manage your cart Here !!">
           <div className="row text-center">
                <div className="col-md-6">
                    {loadAllProducts()}
                </div>
                <div className="col-md-6">
                    <StripeCheckout 
                        products={products}
                        setReload={setReload}
                    />
                </div>
           </div>
        </Base>
    )
}

export default Cart
