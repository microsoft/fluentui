// eslint-disable-next-line import/no-extraneous-dependencies -- Story dependency provided by the workspace.
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- The stories project exercises this workspace package.
import {
  ColorSwatch,
  ImageSwatch,
  SwatchPickerRow,
  type ColorSwatchProps,
  type ImageSwatchProps,
} from '@fluentui/react-modern-components-preview/swatch-picker';

export type SwatchProps = ColorSwatchProps | ImageSwatchProps;

type SwatchPickerGridProps = {
  items: SwatchProps[];
  columnCount: number;
  renderRow?: (props: { children: React.ReactElement[]; rowId: string | number }) => React.ReactElement;
  renderSwatch?: (item: SwatchProps) => React.ReactElement;
};

export const renderSwatchPickerGrid = (props: SwatchPickerGridProps): React.ReactElement[] => {
  const { items, columnCount, renderRow, renderSwatch } = props;
  const renderGridRow =
    renderRow || (({ children, rowId }) => <SwatchPickerRow key={rowId}>{children}</SwatchPickerRow>);
  const renderGridSwatch =
    renderSwatch ||
    ((item: SwatchProps) =>
      'src' in item && item.src ? (
        <ImageSwatch key={item.value} {...item} />
      ) : (
        <ColorSwatch key={item.value} color={item.color || ''} {...item} />
      ));

  const rowCount = Math.ceil(items.length / columnCount);
  const rows = Array.from({ length: rowCount }, (_, index) => {
    const start = index * columnCount;
    return items.slice(start, start + columnCount);
  });

  return rows.map((row, index) => renderGridRow({ children: row.map(renderGridSwatch), rowId: index }));
};
