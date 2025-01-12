import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-course/${course._id}`);
    };

    const handleDelete = () => {
        // Implement delete logic
    };

    return (
        <Card>
            <CardContent onClick={() => navigate(`/course-details/${course._id}`)}>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Typography variant="body2">Price: ${course.price}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleEdit}>
                    Edit
                </Button>
                <Button size="small" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default CourseCard;
