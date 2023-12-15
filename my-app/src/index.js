import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RequestsContextProvider } from "./context/RequestsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { FeedbackProvider } from "./context/FeedbackContext";
import { CommentProvider } from "./context/CommentContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RequestsContextProvider>
        <FeedbackProvider>
        <CommentProvider>
          <App />
          </CommentProvider>
        </FeedbackProvider>
        
      </RequestsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
