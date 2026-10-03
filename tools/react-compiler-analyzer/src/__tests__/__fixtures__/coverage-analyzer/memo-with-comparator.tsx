import React from 'react';

interface Props {
  items: string[];
  label: string;
}

function ListComponent({ items, label }: Props) {
  return (
    <div>
      <h2>{label}</h2>
      <ul>
        {items.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

// Custom comparator  - needs human review if it can be dropped when compiler is enabled for te component
export const MemoWithComparator = React.memo(ListComponent, (prev, next) => {
  return prev.items.length === next.items.length && prev.label === next.label;
});
