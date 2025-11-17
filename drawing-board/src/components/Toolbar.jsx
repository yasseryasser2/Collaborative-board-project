import React from "react";
import ColorPicker from "./ColorPicker";

export default function ToolBar({
  brushSize,
  onBrushSizeChange,
  currentColor,
  onColorChange,
  onClear,
  onUndo,
  onRedo,
}) {
  return (
    <div className="toolbar">
      <h2>Drawing Board</h2>
      <ColorPicker currentColor={currentColor} onColorChange={onColorChange} />

      <div className="brush-size">
        <label>Brush size: {brushSize}</label>
        <input
          type="range"
          min={1}
          max={50}
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
        />
      </div>
      <div className="buttons">
        <button onClick={onClear}>Clear canvas</button>
        <button onClick={onUndo}>Undo</button>
        <button onClick={onRedo}>Redo</button>
      </div>
    </div>
  );
}
