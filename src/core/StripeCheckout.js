import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartempty, loadCart } from './helper/CartHelper'

const StripeCheckout = ({
    products,
    setReload = f => (f),
    reload =undefined
}) => {

    const token = isAuthenticated() && isAuthenticated().token
    const useId = isAuthenticated() && isAuthenticated().user._id

    const [data, setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    })

    const getTotal = () => {
        // return products.reduce((currenValue,nextValue) => {
        //     return currenValue + nextValue.count * nextValue;
        // },0)

        let ammount = 0;
        products.map(p => {
           ammount += p.price 
        })
        return ammount
    }
    
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with Strip</button>
        ) : (
            <Link to="/signin">
            <button className="btn btn-warning">Sign In</button>
            </Link>
        )
    }

    const successMessage = () => {
        //success message
    }
    const errorMessage = () => {
        //error message
    }

    return (
        <div>
            <h3 className="text-white">Stripe checkout </h3>
            <h2>Total Ammount : ${getTotal()}</h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
