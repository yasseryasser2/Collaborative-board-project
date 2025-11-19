import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import "./App.css";

export default function App() {
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [clearCanvas, setClearCanvas] = useState(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);

  function handleBrushSizeChange(size) {
    setBrushSize(size);
  }

  function handleColorChange(color) {
    setCurrentColor(color);
  }

  function handleClear() {
    setClearCanvas(true);
    setTimeout(() => setClearCanvas(false), 0);
  }

  function handleUndo() {
    setUndo(true);
    setTimeout(() => setUndo(false), 0);
  }

  function handleRedo() {
    setRedo(true);
    setTimeout(() => setRedo(false), 0);
  }

  return (
    <div className="app">
      <Toolbar
        brushSize={brushSize}
        onBrushSizeChange={handleBrushSizeChange}
        currentColor={currentColor}
        onColorChange={handleColorChange}
        onClear={handleClear}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <Canvas
        brushSize={brushSize}
        currentColor={currentColor}
        clearCanvas={clearCanvas}
        undo={undo}
        redo={redo}
      />
    </div>
  );
}
