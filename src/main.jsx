import React from 'react';
import ReactDOM from 'react-dom'; // Import from 'react-dom' instead of 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { InitialState } from './Reducer/Reducer.jsx';
import reducer from './Reducer/Reducer.jsx';
import { StateProvider } from './StateProvider/StateProvider.jsx';

// Extend the Chakra UI theme with customizations
export const theme = extendTheme({
  // Define colors
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black"
      }
    }
  },
  colors: {
    brand: {
      50: '#f7fafc',
      500: '#718096',
      900: '#171923',
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={InitialState} reducer={reducer}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
