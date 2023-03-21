import Button from "@mui/material/Button"; 
import Stack from "@mui/material/Stack"; 
import React, {useReducer} from "react"; 
import Applicant from "./components/Applicant";
import School from "./components/School";
import { reducer, getRandomState } from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, [getRandomState()])
  console.log('here')
  return (
    <div className="App">
      <Stack>
        <div>
            My New App
        </div>
        {
          state[state.length] ? 
            <div>
              {`Current State: ${state[state.length].message}`}
          </div> : <></>
        }
        <Button variant="outlined" onClick={() => dispatch('oneTurn')}>One Turn</Button>
        <Button variant="outlined" onClick={() => dispatch('solve')}>Solve</Button>
        <Button variant="outlined" onClick={() => dispatch('reset')}>Reset</Button>

        <School name="Inst A" ranking={[{name: "Joe"}, {name: "Steve"}]} />

        <Applicant name="Joe" rankings={[{school: 'Place 1', offerred: false, tentativeAccept: false}]}/>

      </Stack>
    </div>
  );
}

export default App;
