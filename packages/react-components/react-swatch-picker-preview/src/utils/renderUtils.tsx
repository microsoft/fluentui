import * as React from 'react';
import { ColorSwatch, ColorSwatchProps, SwatchPickerRow } from '../';

export const renderSwatchPickerRow = (
  colors: ColorSwatchProps[],
  rowIdx: number,
  SwatchElement: React.ElementType = ColorSwatch,
) => {
  return (
    <SwatchPickerRow key={`row-${rowIdx}`}>
      {colors.map((color, index) => (
        <SwatchElement key={`${color.value}-${index}`} {...color} />
      ))}
    </SwatchPickerRow>
  );
};

export const renderSwatchPickerGrid = (
  colors: ColorSwatchProps[],
  columnCount: number,
  renderRow: (colors: ColorSwatchProps[], rowIdx: number) => JSX.Element = renderSwatchPickerRow,
) => {
  const rowCount = Math.ceil(colors.length / columnCount);
  const rows = Array.from({ length: rowCount }, (_, i) => {
    const start = i * columnCount;
    const end = start + columnCount;
    return colors.slice(start, end);
  });

  return rows.map(renderRow);
};
