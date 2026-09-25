import { useState } from "react";
import { setTheme } from "@maid_melisa/shared";
import { SugarCube } from "../../../servings/ivy/SugarCube";

import { Steeper } from "../../../servings/ivy/Steeper";
import { Envelope } from "../../../servings/ivy/Envelope";
import { Trolley } from "../../../servings/ivy/Trolley";

setTheme("british");

const teaBlends = [
  {
    id: "earl-grey",
    name: "Earl Grey",
    description:
      "A classic black tea infused with the distinct citrus flavor of bergamot oil.",
    origin: "China / UK",
    color: "bg-amber-100 dark:bg-amber-900/40",
  },
  {
    id: "english-breakfast",
    name: "English Breakfast",
    description:
      "A robust, full-bodied blend of Assam, Ceylon, and Kenyan teas. Perfect with milk.",
    origin: "Assam / Ceylon / Kenya",
    color: "bg-orange-100 dark:bg-orange-900/40",
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    description:
      "Known as the 'Champagne of Teas', featuring a light, floral, and muscatel flavor.",
    origin: "West Bengal, India",
    color: "bg-yellow-100 dark:bg-yellow-900/40",
  },
];
function App() {
  const [count, setCount] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

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

      <Envelope
        label="Attachments"
        variant="glazed"
        multiple
        accept="image/*,application/pdf"
        maxSize={5}
        placeholder="Drop images or PDFs here"
      />

      <div className="mt-8 border-t border-border pt-8">
        <Trolley
          infinite
          variant="stacked"
          size="standard"
          navigationMode="both"
          dragThreshold={100}
          onSwipeLeft={(index) =>
            setLastAction(`Discarded: ${teaBlends[index]?.name}`)
          }
          onSwipeRight={(index) =>
            setLastAction(`Kept: ${teaBlends[index]?.name}`)
          }
          onEmpty={() => setLastAction("All teas reviewed!")}
        >
          {teaBlends.map((tea) => (
            <div
              key={tea.id}
              className={`w-full h-full flex flex-col justify-between p-6 ${tea.color} rounded-xl border border-border/50`}
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tea.name}
                </h3>
                <p className="text-sm font-medium text-primary/80 mb-4 uppercase tracking-wider">
                  {tea.origin}
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  {tea.description}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto pt-4 border-t border-border/30">
                <span>Swipe Left to Discard</span>
                <span>Swipe Right to Keep</span>
              </div>
            </div>
          ))}
        </Trolley>
      </div>
    </div>
  );
}

export default App;
