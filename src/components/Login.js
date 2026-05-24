import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {

    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully","success")
        }
        else{
              props.showAlert("Invalid Credentials","danger")
        }
    }
     const onChange = (e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
    return (
        <div>
             <div className="text-center"> <a className="text-center navbar-brand logo" href="/"> 📒 iNotebook</a></div>
               <h4 className="text-center mb-4">Login to continue using iNotebook</h4>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
            </div>
            <div className="text-center">
        <button  type="submit"className="btn btn-primary ">Login</button>
        </div>
        </form></div>
    )
}

export default Login