import * as React from 'react';
import {
  HoverCard,
  IPlainCardProps,
  HoverCardType,
  DetailsList,
  buildColumns,
  IColumn,
  ThemeProvider,
  Image,
  ImageFit,
  getColorFromString,
  mergeStyles,
} from '@fluentui/react';
import { createListItems, IExampleItem } from '@fluentui/example-data';

const itemClass = mergeStyles({
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
});
const items: IExampleItem[] = createListItems(10);
const buildColumn = (): IColumn[] => {
  return buildColumns(items).filter(
    column => column.name === 'color' || column.name === 'width' || column.name === 'height',
  );
};
const columns: IColumn[] = buildColumn();
const onRenderPlainCard = (item: IExampleItem): JSX.Element => {
  const src = item.thumbnail + `/${getColorFromString(item.color)!.hex}`;
  return <Image src={src} width={item.width} height={item.height} imageFit={ImageFit.cover} />;
};
const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
  const plainCardProps: IPlainCardProps = {
    onRenderPlainCard: onRenderPlainCard,
    renderData: item,
  };
  if (column.key === 'color') {
    return (
      <HoverCard plainCardProps={plainCardProps} instantOpenOnClick type={HoverCardType.plain}>
        <div className={itemClass} style={{ color: item.color }}>
          {item.color}
        </div>
      </HoverCard>
    );
  }
  return item[column.key as keyof IExampleItem];
};

export const HoverCardPlainCardExample: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <p>
        Hover over the <i>color</i> cell of a row item to see the card.
      </p>
      <DetailsList setKey="hoverSet" items={items} columns={columns} onRenderItemColumn={onRenderItemColumn} />
    </ThemeProvider>
  );
};
