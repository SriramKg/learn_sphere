import React,{useState} from "react";
import {TextField, Button, Typography, Box} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password_hash: "",
        role: "student",
        profile_data: {
            first_name: "",
            last_name: "",
            age: 0,
            bio: ""
        }
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(["first_name", "last_name", "age", "bio"].includes(name)){
            setFormData({...formData, profile_data: {...formData.profile_data, [name]: name === "age" ? Number(value) : value}});
        }
        else{
            setFormData({...formData, [name]: value});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", formData);
            console.log(response);
            alert('Registered Successfully. Redirecting to Login Page');
            navigate('/login');
        } catch (error) {
            console.log(error);
            alert('Error Registering', error.response.data.message);
        }
    }

    const handleLogin = () => {
        navigate('/login');
    };

    return ( 
        <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
            <Typography variant="h4">Register</Typography>
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
                    name="password_hash"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    name="role"
                    label="Role"
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    margin="normal"
                    value={formData.role}
                    onChange={handleChange} 
                >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </TextField>
                <TextField 
                    name="first_name"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.profile_data.first_name}
                    onChange={handleChange}
                />
                <TextField 
                    name="last_name"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.profile_data.last_name}
                    onChange={handleChange}
                />
                <TextField 
                    name="age"
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.profile_data.age}
                    onChange={handleChange}
                />    
                <TextField 
                    name="bio"
                    label="Bio"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={formData.profile_data.bio}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2}}> Register </Button>    
                <Button onClick={handleLogin} variant="contained" fullWidth sx={{ mt: 2}}> Login </Button>

            </form>
        </Box>
     );
}
 
export default Register;