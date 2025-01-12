import React,{useState} from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            console.log(response);
            alert('Logged in Successfully');
            if(response.data.role === "instructor"){
                navigate('/instructor-dashboard');
            }
            else{
                navigate('/student-dashboard');
            }
        } catch (error) {
            console.log(error);
            alert('Error Logging in', error.response.data.message);
        }
    }

    return ( 
        <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Login
                </Button>
            </form>
        </Box>
     );
}
 
export default LoginPage;