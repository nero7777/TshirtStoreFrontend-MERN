import React from 'react'
import Menu from './Menu'


const Base = ({
    title="My Title",
    description = "My Description",
    className=" text-white p-4",
    children
}) => (
    
    <div>
    <Menu/>
    <div className="container-fluid">
            <div className="jumbotron  text-white text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    <footer className="footer  mt-auto">
            <div className="container-fluid bg-success text-white text-center py-1">
                <h4>If you got any questions , feel free to reach us out !</h4>
                <button className="btn btn-warning p-1">Contact Us</button>
            </div>
        </footer>
  
        
        
    </div>
)

export default Base
