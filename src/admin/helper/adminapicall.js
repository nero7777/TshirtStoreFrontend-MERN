import { API } from "../../backend";

//category CRUD calls
export const createCategory = (userId,token,category) => {
    return fetch(`${API}category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
};

export const getAllCategories = () => {
    return fetch(`${API}categories`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getACategory = (categoryId,userId,token) => {
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateCategory = (categoryId,userId,token,category) => {
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteCategory = (categoryId,userId,token,category) => {
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method : "Delete",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

//product CRUD calls

export const createProduct = (userId,token,product) => {

    return fetch(`${API}product/create/${userId}`,{
        method : "POST",
        headers : {
           Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getAllProducts = () => {
    return fetch(`${API}products`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
} 

export const getAProduct = productId => {
    return fetch(`${API}product/${productId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateProduct = (productId,userId,token,product) => {
    return fetch(`${API}product/${productId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteProduct = (productId,userId,token,product) => {
    return fetch(`${API}product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}