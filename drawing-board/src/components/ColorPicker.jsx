export default function ColorPicker({ currentColor, onColorChange }) {
  const colors = [
    "#7b93d5",
    "#8e52d5",
    "#ffffc6",
    "#000038",
    "#793259",
    "#fc87c0",
    "#80fe82",
    "#007782",
  ];
  return (
    <div className="color-picker">
      {colors.map((color) => (
        <button
          key={color}
          className={`button-color ${currentColor === color ? "active" : ""}`}
          onClick={() => onColorChange(color)}
          style={{ backgroundColor: color }}
        ></button>
      ))}
    </div>
  );
}
