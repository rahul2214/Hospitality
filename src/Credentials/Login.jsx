import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from the URL when the component mounts
        axios.get('http://localhost:4500/users')
            .then((res) => {
                console.log(res.data); // Log the fetched data
                setUsers(res.data);
            })
            .catch((error) => {
                console.error(error);
                console.error(error);
                setMessage("Error fetching user data")
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.name === name);

        if (user && user.password === pwd) {
            navigate('/home');
        } else {
            setMessage("Credentials don't match");
        }
    }

    return (
        <>
            <nav style={{ backgroundColor:"#a78181",height:"60px",fontSize:"24px",color:"white",paddingLeft:"20px",paddingTop:"10px"}}>BONSTAY</nav>

            <div className="body-form">
                <div className="booking-card">
            <form onSubmit={handleLogin} className='booking-form'>
                <br /><h2 >BonStay with Us</h2><br />
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text"
                         onChange={(event) => setName(event.target.value)}
                        placeholder="UserName"
                    /><br /><br />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password"
                        onChange={(event) => setPwd(event.target.value)}
                        placeholder="Password"
                    /><br /><br />
                </div>
                <div className="text-danger">{message}</div>
                <button type="submit">Login</button>
            </form>
            <p>
                <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
                    Sign UP 
                </span> to create new account
            </p> 
            </div>
            </div>   
        </>
    );
}

export default Login;
