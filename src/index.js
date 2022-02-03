import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

class Doc extends React.Component{
  componentDidMount(){
    document.title = "Котико-погода"
  }

  render(){
    return(
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Doc />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
