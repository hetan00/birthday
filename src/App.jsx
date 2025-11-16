import { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import BirthdayScene from "./components/BirthdayScene";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? (
        <BirthdayScene />
      ) : (
        <IntroScreen onContinue={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;
