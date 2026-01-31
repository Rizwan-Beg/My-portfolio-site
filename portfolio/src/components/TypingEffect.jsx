import React from "react";

const TypingEffect = ({
  text = [],
  speed = 100,
  eraseSpeed = 50,
  typingDelay = 500,
  eraseDelay = 2000,
  cursorRenderer,
  className = "",
}) => {
  const texts = Array.isArray(text) ? text : [String(text || "")];
  const [stringIndex, setStringIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isErasing, setIsErasing] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const current = texts[stringIndex] || "";
    let delay = speed;
    if (!started) delay = typingDelay;
    else if (!isErasing && charIndex === current.length) delay = eraseDelay;
    else if (isErasing) delay = eraseSpeed;

    const timeout = setTimeout(() => {
      if (!isErasing) {
        if (!started) setStarted(true);
        if (charIndex < current.length) setCharIndex((c) => c + 1);
        else setIsErasing(true);
      } else {
        if (charIndex > 0) setCharIndex((c) => c - 1);
        else {
          setIsErasing(false);
          setStarted(false);
          setStringIndex((i) => (i + 1) % texts.length);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [texts, stringIndex, charIndex, isErasing, speed, eraseSpeed, typingDelay, eraseDelay, started]);

  const currentText = texts[stringIndex] || "";
  const display = currentText.slice(0, charIndex);
  const cursor = cursorRenderer ? cursorRenderer("|") : <span>|</span>;

  return (
    <span className={className}>
      {display}
      {cursor}
    </span>
  );
};

export default TypingEffect;

