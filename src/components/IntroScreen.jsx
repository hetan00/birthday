import { useEffect, useState } from "react";

const LINES = [
  "> ritik",
  "...",
  "> hope you had an amazing birtday",
  "...",
  "> I made this program for you!",
  "...",
  "ʕ(ɵ‿ɵ)ʔ ʕ(ɵ‿ɵ)ʔ ʕ(ɵ‿ɵ)ʔ_"
];

function IntroScreen({ onContinue }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setFinished(true);
      return;
    }

    const currentLine = LINES[lineIndex];

    const timeout = setTimeout(() => {
      if (charIndex < currentLine.length) {
        setCurrentText(currentLine.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else {
        // move to next line
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentText("");
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }
    }, 60); // typing speed ms

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex]);

  const handleClick = () => {
    if (finished) onContinue();
  };

  return (
    <div
      style={{
        background: "black",
        color: "white",
        fontFamily: "Typewriter, monospace",
        fontSize: "3rem",
        height: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: finished ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      {displayedLines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      {/* current typing line */}
      {!finished && (
  <p style={{ fontFamily: "Typewriter" }}>{currentText}|</p>
)}

      {finished && (
        <p style={{ marginTop: "2rem", opacity: 0.6 }}>
          (click anywhere to continue)
        </p>
      )}
    </div>
  );
}

export default IntroScreen;
