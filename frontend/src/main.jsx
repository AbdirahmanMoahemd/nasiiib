import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
        
import "primeicons/primeicons.css";
//core
import "primereact/resources/primereact.min.css";
import { Provider } from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import store from "./store";

 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter> 
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
