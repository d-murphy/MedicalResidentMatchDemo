import Button from "@mui/material/Button"; 
import Stack from "@mui/material/Stack"; 
import React, {useReducer} from "react"; 
import Applicant from "./components/Applicant";
import School from "./components/School";
import { reducer } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, {lastTurn: 'other' })
  return (
    <div className="App">
      <Stack>
        <div>
            My New App
        </div>
        <div>
            {`Current State: ${state.lastTurn}`}
        </div>
        <Button variant="outlined" onClick={() => dispatch('new')}>New</Button>
        <Button variant="outlined" onClick={() => dispatch('other')}>Other</Button>
        <Button variant="outlined" onClick={() => dispatch('playerTurn')}>Player Turn</Button>

        <School name="Inst A" ranking={[{name: "Joe"}, {name: "Steve"}]} />

        <Applicant name="Joe" rankings={[{school: 'Place 1', offerred: false, tentativeAccept: false}]}/>

      </Stack>
    </div>
  );
}

export default App;
