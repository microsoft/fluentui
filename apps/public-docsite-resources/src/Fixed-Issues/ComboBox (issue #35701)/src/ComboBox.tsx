import { useRef, useState, useLayoutEffect } from "react";

const OPTIONS = [
  "Short",
  "Medium value",
  "This_is_a_very_very_very_very_very_very_long_freeform_value_that_requires_horizontal_scrolling"
];

export default function ComboBox() {
  const [value, setValue] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollLeftRef = useRef(0);

  // Save scroll position
  const handleScroll = () => {
    if (listRef.current) {
      scrollLeftRef.current = listRef.current.scrollLeft;
    }
  };

  // Restore scroll position after React commits updates
  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeftRef.current;
    }
  });

  return (
    <div style={{ width: 320 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Freeform typing..."
        style={{ width: "100%", marginBottom: 6 }}
      />

      {/* IMPORTANT: this div must never be conditionally rendered */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        role="listbox"
        style={{
          border: "1px solid #ccc",
          overflowX: "auto",
          overflowY: "auto",
          whiteSpace: "nowrap",
          maxHeight: 120
        }}
      >
        {OPTIONS.map((opt) => (
          <div
            key={opt} // stable key!
            role="option"
            style={{
              padding: "6px 8px",
              minWidth: "max-content"
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
