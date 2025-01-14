import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  AvatarGroup,
  Modal,
  TextField,
} from "@mui/material";
import ModuleGetter from "../components/ModuleGetter";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [modules, setModules] = useState([]);

  const getModulesForCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/modules/module/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const modules = response.data?.message;
      if (modules) {
        setModules(modules);
      } else {
        setError("Modules not found");
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      setError("Failed to fetch modules");
    }
  };



  const getCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const courseData = response.data?.message?.[0];
      if (courseData) {
        setCourse(courseData);
      } else {
        setError("Course data not found");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to fetch course details");
    }
  };

  const addModule = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/modules`,
        {
          course_id: id,
          title: newModuleTitle,
          order: course.modules.length + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the course state to include the new module
      const newModule = response.data.module; // Assuming the API returns the created module
      console.log("New Module:", response);
      setCourse((prevCourse) => ({
        ...prevCourse,
        modules: [...prevCourse.modules, newModule],
      }));

      setModalOpen(false); // Close the modal
      setNewModuleTitle(""); // Reset the input
    } catch (error) {
      console.error("Error adding module:", error);
      setError("Failed to add module");
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  useEffect(() => {
    getModulesForCourse();
    }, [course]);

  if (error) {
    return (
      <Typography variant="h4" color="error">
        {error}
      </Typography>
    );
  }

  if (!course) {
    return <Typography variant="h4">Loading course details...</Typography>;
  }
  console.log("Modules:", modules);
  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Course Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {course.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", marginTop: "10px" }}>
            {course.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
            <AvatarGroup total={2340}>
              <Avatar alt="Learner 1" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Learner 2" src="/static/images/avatar/2.jpg" />
            </AvatarGroup>
            <Typography variant="body2">{course.learners} learners</Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src="/path-to-course-image.jpg"
          alt="Course Thumbnail"
          sx={{ width: 300, borderRadius: 2 }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add a new module
        </Button>
        <Button variant="outlined" color="primary">
          Edit course details
        </Button>
      </Box>

      {/* Modules */}
      {/* <Typography variant="h5" sx={{ marginBottom: 2 }}>
        All modules ({course.modules.length})
      </Typography> */}
      <ModuleGetter id={course._id} modules={modules} />
      {/* <ModuleGetter modules={course.modules.map((module) => ({ ...module, key: module._id }))} id={course._id} /> */}

      {/* Modal for Adding Module */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Module
          </Typography>
          <TextField
            fullWidth
            label="Module Title"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addModule}
            disabled={!newModuleTitle.trim()} // Disable if input is empty
          >
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseDetails;
