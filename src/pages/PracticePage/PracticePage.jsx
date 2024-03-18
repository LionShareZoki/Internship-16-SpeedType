import React from "react";
import { Box, TextField, Typography } from "@mui/material";

function PracticePage() {
  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Practice Typing
      </Typography>
      <TextField
        id="practice-input"
        label="Start typing here..."
        variant="outlined"
        multiline
        maxRows={4}
        value={inputText}
        onChange={handleInputChange}
        sx={{ width: "70%" }}
      />
    </Box>
  );
}

export default PracticePage;
