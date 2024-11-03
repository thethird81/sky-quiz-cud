import React, { useState } from "react";
import AddQuestion from "./components/AddQuestion";
import QuestionList from "./components/QuestionList";
import {  Box } from "@mui/material";

function App() {
  const [editQuestion, setEditQuestion] = useState(null);

  return (
    <Box className="App" marginLeft={20} marginRight={20} marginTop={10} bgcolor={'#fafafa'} padding={10}>
      <h1>SKYQUIZ CRUD </h1>
      <AddQuestion editQuestion={editQuestion} setEditQuestion={setEditQuestion} />
      <QuestionList setEditQuestion={setEditQuestion} />
    </Box>
  );
}

export default App;
