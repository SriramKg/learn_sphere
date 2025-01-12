import React, {useEffect,useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const[courses, setCourses] = useState([]);

    const getCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/courses/course/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCourses(response.data.message);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCourse();
    }, [id]);

    return ( 
        <>
            <h1>Course Details</h1>
            <p>Course ID: {id}</p>
            <p>Course Name: {course.title}</p>
        </>
     );
}
 
export default CourseDetails;