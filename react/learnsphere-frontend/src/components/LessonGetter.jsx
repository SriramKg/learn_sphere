import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LessonGetter = ({ moduleId }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false); // New state
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [uploadType, setUploadType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState("");

  const createLesson = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/lessons`,
        {
          module_id: moduleId,
          title: title,
          content_type: uploadType,
          content_url: "https://google.com", // Placeholder
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getLessonsForModule(); // Refresh lessons after creating
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  const getLessonsForModule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/lessons/lesson/${moduleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const lessonsData = response.data?.message;
      if (lessonsData) {
        setLessons(lessonsData);
      } else {
        setError("Lessons not found");
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setError("Failed to fetch lessons");
    }
  };

  useEffect(() => {
    getLessonsForModule();
    setCurrentModuleId(moduleId); // Set currentModuleId on mount
  }, [moduleId]);

  const handleOpenModal = (type) => {
    setUploadType(type);
    setIsAddingLesson(false); // Important: Reset flag
    setModalOpen(true);
  };

  const handleOpenModalForLesson = () => {
    setIsAddingLesson(true); // Set flag for "Add Lesson" modal
    setUploadType("Text"); // Reset upload type
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTitle("");
    setUploadedFiles([]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => [
        ...prev,
        { name: file.name, status: "File uploaded successfully" },
      ]);
    }
  };

  const handleDeleteFile = (fileName) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSave = () => {
    createLesson();
    handleCloseModal();
  };

  if (loading) {
    return <Typography>Loading lessons...</Typography>;
  }
  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      {lessons.length === 0 && (
        <div>
          <Typography variant="body2" sx={{ color: "gray" }}>
            No lessons available for this module.
          </Typography>
          <Button variant="outlined" onClick={handleOpenModalForLesson}>
            Add Lesson
          </Button>
        </div>
      )}

      {lessons.length > 0 && (
        <List>
          {lessons.map((lesson) => (
            <ListItem key={lesson._id}>
              <ListItemText
                primary={lesson.title}
                secondary={`${lesson.type} • ${
                  lesson.duration || lesson.questions || ""
                }`}
              />
              {/* <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => onEditLesson(lesson._id)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  edge="end"
                  onClick={() => onDeleteLesson(lesson._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
              <div style={{ marginTop: 16 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal("video")}
                  style={{ marginRight: 8 }}
                >
                  Add Video
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal("article")}
                >
                  Add Article
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      )}

      <Modal open={modalOpen} onClose={handleCloseModal}>
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
          <Typography variant="h6" gutterBottom>
            {isAddingLesson
              ? "Add Lesson"
              : `Add ${uploadType === "video" ? "Video" : "Article"}`}
          </Typography>

          <TextField
            label={isAddingLesson ? "Lesson Title" : "Title"}
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />

          {!isAddingLesson && ( // Conditionally render file upload
            <div>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Upload {uploadType === "video" ? "Video" : "Article"}
                <input
                  type="file"
                  hidden
                  accept={
                    uploadType === "video" ? "video/*" : "application/pdf"
                  }
                  onChange={handleFileUpload}
                />
              </Button>
              <List sx={{ marginTop: 2 }}>
                {uploadedFiles.map((file) => (
                  <ListItem
                    key={file.name}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteFile(file.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={file.name} secondary={file.status} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}

          <div style={{ marginTop: 16, textAlign: "right" }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LessonGetter;
