import React, { useEffect, useState } from "react";
import dashboardbg from './assests/background-dashboard-transformed.jpeg';
import { getUserInfo } from "./apiServices";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";

function Dashboard(){
    let [userInfo,setUserInfo]=useState([]);
    const [greeting, setGreeting] = useState('');
    useEffect(()=>{
        const hours = new Date().getHours();
        let currentGreeting;
    
        if (hours >= 5 && hours < 12) {
          currentGreeting = 'Good Morning';
        } else if (hours >= 12 && hours < 17) {
          currentGreeting = 'Good Afternoon';
        } else if (hours >= 17 && hours < 21) {
          currentGreeting = 'Good Evening';
        } else {
          currentGreeting = 'Good Night';
        }
    
        setGreeting(currentGreeting);
        getUserInfo().then((res)=>{
            console.log("res",res);
            setUserInfo(res)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login');
    };
    return(
       <div className="App">
        <img src={dashboardbg}  className="imgbg" alt="Background"></img>
        <div className="signup-box">
            <h5>Hii...{greeting} <span className="text-capitalize">{userInfo.userName}</span></h5>
            <button className="btn btn-danger mt-3" style={{backgroundColor:'#b71c1c'}} onClick={handleLogout}>
                Logout
            </button>
        </div>
       </div>
    )
}

export default Dashboard;