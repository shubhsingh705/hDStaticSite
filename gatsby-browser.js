// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

// 2. New MUI Imports
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './src/theme'; // This assumes your theme file is at src/theme.js

// 3. Gatsby Browser API Hook: wrapRootElement
// This function wraps the entire React element tree with your custom theme.
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  );
};
