import React, { useState, useEffect, useRef } from "react";

export default function Canvas({
  brushSize,
  currentColor,
  clearCanvas,
  undo,
  redo,
}) {
  const canvasRef = useRef();
  const isDrawing = useRef(false);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  function saveToHistory() {
    const canvas = canvasRef.current;
    const canvasData = canvas.toDataURL();

    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvasData);

    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  }
  function startDrawing(e) {
    isDrawing.current = true;
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={() => {}}
        onMouseMove={() => {}}
        onMouseUp={() => {}}
        onMouseLeave={() => {}}
      ></canvas>
    </div>
  );
}
