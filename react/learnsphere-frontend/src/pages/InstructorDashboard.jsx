import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';


const InstructorDashboard = () => {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const instructorId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8080/api/courses/${instructorId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            setCourses(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    return ( 
        <Box sx={{padding: 4}} >
            <Typography variant="h4" sx={{mb: 3}}>Instructor Dashboard</Typography>
            <Button variant="contained" onClick={() => navigate('/create-course')}>Create Course</Button>
            <Grid container spacing={3} sx={{mt: 3}}> 
                {courses.map(course => (
                    <Grid item xs={12} md={6} lg={4} key={course.id}>
                        <CourseCard course={course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
     );
}
 
export default InstructorDashboard;