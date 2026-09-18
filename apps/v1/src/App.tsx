import { useState } from "react";
import { setTheme } from "@maid_melisa/shared";
import { SugarCube } from "../../../servings/ivy/SugarCube";

setTheme("british");
function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "2rem" }}>
      {/* <div className="bg-primary text-surface p-4 mb-4 border border-border"> */}
      {/*   Tailwind Theme Test */}
      {/* </div> */}
      <SugarCube variant="steeped">Steeped</SugarCube>
      <SugarCube variant="plain">Plain</SugarCube>
      <SugarCube variant="glazed">Glazed</SugarCube>
    </div>
  );
}

export default App;
