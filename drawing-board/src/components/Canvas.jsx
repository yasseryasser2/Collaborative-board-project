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

  function loadFromHistory(step) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = history[step];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, []);

  useEffect(() => {
    if (clearCanvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    }
  }, [clearCanvas]);

  useEffect(() => {
    if (undo && historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      loadFromHistory(newStep);
    }
  }, [undo]);

  useEffect(() => {
    if (redo && historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      loadFromHistory(newStep);
    }
  }, [redo]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={1200}
        height={1000}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
}
