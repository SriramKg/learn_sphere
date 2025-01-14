import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Modal,
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
  } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import LessonGetter from "./LessonGetter"; // Import the LessonGetter component

const ModuleGetter = ({ modules,id }) => {
  const [error, setError] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [uploadType, setUploadType] = useState(""); // 'video' or 'article'
  const [uploadedFiles, setUploadedFiles] = useState([]); // Track uploaded files
  const [title, setTitle] = useState("");

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!modules || modules.length === 0) {
    return (
      <Typography variant="body1">
        No modules available for this course.
      </Typography>
    );
  }
  const handleAccordionToggle = (moduleId) => {
    setExpandedModule((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleOpenModal = (moduleId, type) => {
    setCurrentModuleId(moduleId);
    setUploadType(type);
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
    console.log("Save:", { title, uploadedFiles, type: uploadType, currentModuleId });
    handleCloseModal();
  };

  const handleEditLesson = (lessonId) => {
    console.log("Edit lesson:", lessonId);
    // Implement edit functionality here
  };

  const handleDeleteLesson = (lessonId) => {
    console.log("Delete lesson:", lessonId);
    // Implement delete functionality here
  };

  return (
    <div>
      <Typography variant="h6">All modules ({modules.length})</Typography>
      {modules.map((module) => (
        <Accordion
          key={module._id}
          expanded={expandedModule === module._id}
          onChange={() => handleAccordionToggle(module._id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{module.title}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginLeft: 2 }}
            >
              {module.videos} videos • {module.articles} articles •{" "}
              {module.quiz} quiz
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {expandedModule === module._id && (
                <LessonGetter
                  moduleId={module._id}
                  onEditLesson={handleEditLesson}
                  onDeleteLesson={handleDeleteLesson}
                  onCreatedLesson={handleSave}
                />
              )}
              <div style={{ marginTop: 16 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal(module._id, "article")}
                >
                  Delete Module
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Modal */}
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
            Add {uploadType === "video" ? "Video" : "Article"}
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
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
              accept={uploadType === "video" ? "video/*" : "application/pdf"}
              onChange={handleFileUpload}
            />
          </Button>

          {/* Uploaded Files List */}
          <List sx={{ marginTop: 2 }}>
            {uploadedFiles.map((file) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteFile(file.name)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={file.status}
                />
              </ListItem>
            ))}
          </List>

          {/* Save and Cancel Buttons */}
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

export default ModuleGetter;
