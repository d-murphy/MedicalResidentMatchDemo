import Button from "@mui/material/Button"; 
import Stack from "@mui/material/Stack"; 
import React from "react"; 
import Applicant from "./components/Applicant";
import School from "./components/School";

function App() {
  return (
    <div className="App">
      <Stack>
        <div>
        My New App

        </div>
        <Button variant="outlined">Button</Button>

        <School name="Inst A" ranking={[{name: "Joe"}, {name: "Steve"}]} />

        <Applicant name="Joe" rankings={[{school: 'Place 1', offerred: false, tentativeAccept: false}]}/>

      </Stack>
    </div>
  );
}

export default App;
