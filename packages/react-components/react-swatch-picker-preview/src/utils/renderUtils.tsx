import * as React from 'react';
import { ColorSwatch, SwatchPickerRow, ImageSwatch } from '../';
import type { ColorSwatchProps, ImageSwatchProps } from '../';

export type SwatchProps = ImageSwatchProps | ColorSwatchProps;

export type SwatchPickerGridProps = {
  items: SwatchProps[];
  columnCount: number;
  renderRow?: (props: { children: JSX.Element[]; rowId: string | number }) => JSX.Element;
  renderSwatch?: (item: SwatchProps) => JSX.Element;
};

export const renderSwatchPickerGrid = (props: SwatchPickerGridProps) => {
  const { items, columnCount, renderRow, renderSwatch } = props;
  const _renderRow = renderRow || (({ children, rowId }) => <SwatchPickerRow key={rowId}>{children}</SwatchPickerRow>);
  const _renderSwatch =
    renderSwatch ||
    ((item: SwatchProps) =>
      (item as ImageSwatchProps).src ? (
        <ImageSwatch key={item.value} src={(item as ImageSwatchProps).src ?? ''} {...item} />
      ) : (
        <ColorSwatch key={item.value} color={item.color || ''} {...item} />
      ));

  const rowCount = Math.ceil(items.length / columnCount);
  const rows = Array.from({ length: rowCount }, (_, i) => {
    const start = i * columnCount;
    const end = start + columnCount;
    return items.slice(start, end);
  });

  return rows.map((row, index) => _renderRow({ children: row.map(_renderSwatch), rowId: index }));
};
