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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e) {
    if (isDrawing.current === false) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    if (isDrawing.current === true) {
      saveToHistory();
    }
    isDrawing.current = false;
  }

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
}
