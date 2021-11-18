import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import vehicleLocations from "./helper";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function App() {
  const [values, setValues] = useState([]);
  const [result, setResult] = useState();
  const [index, setIndex] = useState(0);
  const [state, setState] = useState(false);
  const [message, setMessage] = useState([]);
  let newId = 0;

  useEffect(() => {
    console.log("values", values);
  }, [values])

  useEffect(() => {
    if (state) {
      const timer = setInterval(() => {
        newId = Number(newId) + 1;
        // console.log("run");
        // console.log(newId);
        
        if (newId < vehicleLocations.length - 1) {
          const formData = new FormData();
          formData.append("latitude", vehicleLocations[newId].latitude);
          formData.append("longitude", vehicleLocations[newId].longitude);
          if (formData) {
            axios
              .post("http://192.168.1.104:5000/predict", formData)
              .then((response) => {  
                console.log("response", response.data);
                values.push(response.data);
                console.log("values", values[values.length-2]);
                setResult(response.data);
                setIndex(index + 1);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    } else setResult();
  }, [state]);

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "linear-gradient(135deg, #1a1818 0%, #272629 100%)",
        // display: "table-cell",
        verticalAlign: "middle",
        horizontalAlign: "middle",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Button
        variant="contained"
        onClick={() => setState(true)}
        style={{ marginBottom: "20px" }}
      >
        Demo Start
      </Button> */}
      <h1
        className="sentiment-text"
        style={{ fontSize: '50px', marginTop: "20px", color: "white", paddingBottom: "0px", marginBottom: "0px" }}
      >
        Your
      </h1>
      <h1
        className="sentiment-text"
        style={{ fontSize: '50px', marginBottom: "20px", color: "white", paddingTop: "0px", marginTop: "0px" }}
      >
        Optimal Speed
      </h1>
      <ArrowDownwardIcon style={{ fontSize: '50px', color: "white" }}/>
      <p
        className="sentiment-text"
        style={{ color: "white" }}
      >
        {/* {result >=0 ? <p style={{color: "white" }}>{result}kmh</p> : "Not moving.."} */}
        {result >=0 ? <h1 style={{color: "white", fontSize: '150px', paddingBottom: "0px", marginBottom: "0px" }}>{result}</h1> : <h1 style={{color: "white", fontSize: '150px', paddingBottom: "0px", marginBottom: "0px" }}>0</h1>}
        <h1 style={{color: "white", fontSize: '80px', paddingTop: "0px", marginTop: "0px" }}>kmh</h1>
      </p>
      <FormControlLabel
        control={
          <Switch checked={state} onChange={handleChange} name="checkedB" color="primary"/>
        }
        label={state ? <p style={{color: "white" }}>On</p> : <p style={{color: "white" }}>Off</p>}
      />
      <Button
        variant="contained"
        onClick={() => setState(true)}
        style={{ marginTop: "20px" }}
      >
        Demo Start
      </Button>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default App;
