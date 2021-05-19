import * as React from 'react';
import {
  DetailsList,
  buildColumns,
  IColumn,
  mergeStyleSets,
  HoverCard,
  IExpandingCardProps,
  ThemeProvider,
} from '@fluentui/react';
import { createListItems, IExampleItem } from '@fluentui/example-data';

const classNames = mergeStyleSets({
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  expandedCard: {
    padding: '16px 24px',
  },
  item: {
    selectors: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
});

const items: IExampleItem[] = createListItems(10);

const buildColumn = (): IColumn[] => {
  return buildColumns(items).filter(column => column.name === 'location' || column.name === 'key');
};

const onRenderCompactCard = (item: IExampleItem): JSX.Element => {
  return (
    <div className={classNames.compactCard}>
      <a target="_blank" href={`http://wikipedia.org/wiki/${item.location}`}>
        {item.location}
      </a>
    </div>
  );
};

const columns: IColumn[] = buildColumn();

const onRenderExpandedCard = (item: IExampleItem): JSX.Element => {
  return (
    <div className={classNames.expandedCard}>
      {item.description}
      <DetailsList setKey="expandedCardSet" items={items} columns={columns} />
    </div>
  );
};

const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
  const expandingCardProps: IExpandingCardProps = {
    onRenderCompactCard: onRenderCompactCard,
    onRenderExpandedCard: onRenderExpandedCard,
    renderData: item,
  };
  if (column.key === 'location') {
    return (
      <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
        <div className={classNames.item}>{item.location}</div>
      </HoverCard>
    );
  }
  return item[column.key as keyof IExampleItem];
};

export const HoverCardBasicExample: React.FunctionComponent = () => (
  <ThemeProvider>
    <p>
      Hover over the <i>location</i> cell of a row item to see the card or use the keyboard to navigate to it.
    </p>
    <p>When using the keyboard to tab to it, the card will open but navigation inside of it will not be available.</p>
    <DetailsList setKey="hoverSet" items={items} columns={columns} onRenderItemColumn={onRenderItemColumn} />
  </ThemeProvider>
);
