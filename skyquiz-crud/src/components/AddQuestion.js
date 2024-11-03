import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Snackbar, Alert, Select, InputLabel, FormControl, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import { addQuestion, updateQuestion } from "../services/questionService";
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

const AddQuestion = ({ editQuestion, setEditQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [aircraftTypeValue, setAircraftTypeValue] = useState("");
  const [system, setSystem] = useState("");
  const [level, setLevel] = useState("");
  const [explanation, setExplanation] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion.question);
      setOptions(editQuestion.options);
      setCorrectAnswer(editQuestion.correctAnswer);
      setAircraftTypeValue(editQuestion.aircraftType);
      setSystem(editQuestion.system);
      setLevel(editQuestion.level);
      setExplanation(editQuestion.explanation);
    }
  }, [editQuestion]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctAnswer === index) {
      setCorrectAnswer(null);
    } else if (correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1);
    }
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswer(index);
  };

  const addFromJson=()=>{
insertData();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
      correctAnswer,
      aircraftType: aircraftTypeValue,
      system,
      level,
      explanation,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (editQuestion) {
      await updateQuestion(editQuestion.id, newQuestion);
      setAlert({ open: true, message: "Question updated successfully!", severity: "success" });
      setEditQuestion(null);
    } else {
      await addQuestion(newQuestion);
      setAlert({ open: true, message: "Question added successfully!", severity: "success" });
    }

    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    setAircraftTypeValue("");
    setSystem("");
    setLevel("");
    setExplanation("");
  };

  return (
    <><FormControl fullWidth margin="normal">
      <TextField label="Question" value={question} onChange={(e) => setQuestion(e.target.value)} fullWidth margin="normal" />
      {options.map((option, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            fullWidth
            margin="normal" />
          <FormControlLabel
            control={<Checkbox
              checked={correctAnswer === index}
              onChange={() => handleCorrectAnswerChange(index)} />}
            label="Correct" />
          <Button onClick={() => removeOption(index)}>Remove</Button>
        </Box>
      ))}
      <Button onClick={addOption}>Add Option</Button>
      <FormControl fullWidth margin="normal">
        <InputLabel>Aircraft Type</InputLabel>
        <Select
          value={aircraftTypeValue}
          onChange={(e) => setAircraftTypeValue(e.target.value)}
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
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          fullWidth
        >
          {systems.map((sys) => (
            <MenuItem key={sys} value={sys}>
              {sys}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Level</InputLabel>
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          fullWidth
        >
          {['easy', 'medium', 'difficult'].map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Explanation" value={explanation} onChange={(e) => setExplanation(e.target.value)} fullWidth margin="normal" />
      <Button type="submit" onClick={handleSubmit}>{editQuestion ? "Update Question" : "Add Question"}</Button>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </FormControl><Button onClick={addFromJson}>Add from JSON</Button></>
  );
};

export default AddQuestion;
