import { useState } from "react";
import { setTheme } from "@maid_melisa/shared";
import { SugarCube } from "../../../servings/ivy/SugarCube";

import { Steeper } from "../../../servings/ivy/Steeper";

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

      <Steeper
        label="Email"
        variant="steeped"
        type="email"
        placeholder="your@email.com"
      />
      <Steeper
        label="Password"
        variant="plain"
        type="password"
        placeholder="••••••••"
      />
      <Steeper label="Search" type="search" placeholder="Search..." />
      <Steeper label="Notes" type="textarea" placeholder="Write here..." />
    </div>
  );
}

export default App;
