import React, { useEffect, useState } from "react";
import { getQuestions, deleteQuestion } from "../services/questionService";
import { Button, Box, Select, MenuItem, Snackbar, Alert, FormControl, InputLabel } from "@mui/material";
import ConfirmDialog from "./ConfirmDialog";
import insertData from "../services/insertData";

const systems = [
  'Airplane General',
  'Air Systems',
  'Anti-Ice, Rain',
  'Automatic Flight',
  'Communications',
  'Electrical',
  'Engines, APU',
  'Fire Protection',
  'Flight Controls',
  'Flight Instruments, Displays',
  'Flight Management, Navigation',
  'Fuel',
  'Hydraulics',
  'Landing Gear',
  'Warning Systems'
];

const aircraftType = ['B777', 'B787', 'B737', 'A350', 'B767', 'Q400'];

const QuestionList = ({ setEditQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
  const [filters, setFilters] = useState({ aircraftType: "", system: "" });

  useEffect(() => {
    //insertData();
    const fetchQuestions = async () => {
      const response = await getQuestions();
      if (response.success) {
        setQuestions(response.data);
      } else {
        setAlert({ open: true, message: response.message, severity: "error" });
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteQuestion(id);
    if (response.success) {
      setQuestions(questions.filter((question) => question.id !== id));
      setAlert({ open: true, message: response.message, severity: "success" });
    } else {
      setAlert({ open: true, message: response.message, severity: "error" });
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const response = await getQuestions();
    if (response.success) {
      const filteredData = response.data.filter(
        (q) =>
          (filters.aircraftType ? q.aircraftType === filters.aircraftType : true) &&
          (filters.system ? q.system === filters.system : true)
      );
      setQuestions(filteredData);
    } else {
      setAlert({ open: true, message: response.message, severity: "error" });
    }
  };

  const handleShowAll = async () => {
    const response = await getQuestions();
    if (response.success) {
      setQuestions(response.data);
      setFilters({ aircraftType: "", system: "" });
    } else {
      setAlert({ open: true, message: response.message, severity: "error" });
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Aircraft Type</InputLabel>
          <Select
            name="aircraftType"
            value={filters.aircraftType}
            onChange={handleFilterChange}
            fullWidth
          >
            {aircraftType.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>System</InputLabel>
          <Select
            name="system"
            value={filters.system}
            onChange={handleFilterChange}
            fullWidth
          >
            {systems.map((sys) => (
              <MenuItem key={sys} value={sys}>
                {sys}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleShowAll}>Show All</Button>
      </Box>
      {questions.map((question) => (
        <Box key={question.id} display="flex" alignItems="center" justifyContent="space-between">
          <Box><h3>{question.question}</h3></Box>
          <Box justifyContent="space-between"><Button onClick={() => setEditQuestion(question)}>Edit</Button>
          <Button onClick={() => setConfirmDialog({ open: true, id: question.id })}>Delete</Button></Box>
        </Box>
      ))}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, id: null })}
        onConfirm={() => {
          handleDelete(confirmDialog.id);
          setConfirmDialog({ open: false, id: null });
        }}
        message="Are you sure you want to delete this question?"
      />
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QuestionList;
