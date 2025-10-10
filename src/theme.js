// src/theme.js

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    // This overrides the default primary color (blue) across all components
    primary: {
      main: '#f05f40', 
      light: '#f05f40', // Recommended lighter shade
      dark: '#f05f40',  // Recommended darker shade
      contrastText: '#fff', 
    },
    // Optionally, you can add other custom palette colors here
  },
});

export default customTheme;