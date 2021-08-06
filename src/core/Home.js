import React , {useState , useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'
import Card from './Card'
import { getAllProducts } from './helper/coreapicalls'


function Home() {

    const [products, setProducts] = useState([]);

    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllProducts()
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    }
    
    useEffect(() => {
     loadAllProducts()
    }, [])

    return (
        <Base title="T-shirt Store" description="Welcome to the T-shirt Store">
        <h1 className="text-white text-center mb-4">All of the T-shirts in Store</h1>
           <div className="row text-center">
            {products.map((product,index) => {
                return( <div className="col-4">
                <Card 
                    product={product}
                />
            </div>)
            })}
            
            
           </div>
        </Base>
    )
}

export default Home
