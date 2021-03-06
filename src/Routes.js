import React from 'react'
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from "./admin/ManageCategories"
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import Orders from './admin/Orders'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'



function Routes() {
    return (
       <Router>
           <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/signup" exact component={Signup} />
               <Route path="/signin" exact component={Signin} />
               <Route path="/cart" exact component={Cart} />
               <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
               <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
               <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
               <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
               <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
               <AdminRoute path="/admin/products" exact component={ManageProducts}/>
               <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
               <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
               <AdminRoute path="/admin/orders" exact component={Orders}/>
           </Switch>
       </Router>
    )
}

export default Routes
