import React from "react";

const BlurBlob = ({ position = {}, size = {}, className = "" }) => {
  const style = {
    position: "absolute",
    top: position.top,
    left: position.left,
    width: size.width,
    height: size.height,
  };

  return (
    <div
      style={style}
      className={`pointer-events-none rounded-full blur-3xl bg-gradient-to-br from-purple-500/30 via-indigo-500/25 to-sky-500/20 ${className}`}
    />
  );
};

export default BlurBlob;