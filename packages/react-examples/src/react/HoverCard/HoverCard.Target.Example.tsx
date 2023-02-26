import * as React from 'react';
import {
  HoverCard,
  IExpandingCardProps,
  DirectionalHint,
  DetailsList,
  buildColumns,
  IColumn,
  ThemeProvider,
  KeyCodes,
  mergeStyleSets,
} from '@fluentui/react';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { useBoolean, useConst } from '@fluentui/react-hooks';

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

const log = (text: string): (() => void) => {
  return (): void => {
    console.log(text);
  };
};

const items: IExampleItem[] = createListItems(10);
const columns: IColumn[] = buildColumns(items).filter(column => column.name === 'location' || column.name === 'key');

const onRenderCompactCard = (item: IExampleItem): JSX.Element => {
  return (
    <div className={classNames.compactCard}>
      <a target="_blank" href={`http://wikipedia.org/wiki/${item.location}`}>
        {item.location}
      </a>
    </div>
  );
};

const onRenderExpandedCard = (item: IExampleItem): JSX.Element => {
  return (
    <div className={classNames.expandedCard}>
      {item.description}
      <DetailsList setKey="expandedCardSet" items={items} columns={columns} />
    </div>
  );
};

/**
 * Used for the hoverable "key" cell. In this case, the implementation uses hooks to control
 * open/closed state, so it must be a function component (not just code within a render callback).
 */
const KeyCellWithHoverCard: React.FunctionComponent<{ item: IExampleItem }> = ({ item }) => {
  const [contentRendered, { toggle: toggleContentRendered }] = useBoolean(false);
  const targetElementRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
  const expandingCardProps: IExpandingCardProps = useConst({
    onRenderCompactCard,
    onRenderExpandedCard,
    renderData: item,
    directionalHint: DirectionalHint.rightTopEdge,
    directionalHintFixed: false,
    gapSpace: 16,
    calloutProps: {
      isBeakVisible: true,
    },
  });
  React.useEffect(toggleContentRendered, [toggleContentRendered]);

  return (
    <div className={classNames.item}>
      <div ref={targetElementRef} data-is-focusable>
        {item.key}
        {contentRendered && (
          <HoverCard
            expandingCardProps={expandingCardProps}
            target={targetElementRef.current}
            cardDismissDelay={300}
            onCardVisible={log('onCardVisible')}
            onCardHide={log('onCardHide')}
            trapFocus
            openHotKey={KeyCodes.enter}
          />
        )}
      </div>
    </div>
  );
};

const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
  if (column.key === 'key') {
    return <KeyCellWithHoverCard item={item} />;
  }
  return item[column.key as keyof IExampleItem];
};

export const HoverCardTargetExample: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <p>
        Hover over the <strong>key</strong> cell of a row item to see the card or use the keyboard to navigate to it by
        tabbing to a row and hitting the right arrow key.
      </p>
      <p>
        When using the keyboard to navigate, open the card with the hotkey and it will automatically focus the first
        focusable element in the card allowing further navigation inside the card. The hotkey is defined by the{' '}
        <code>openHotKey</code> prop and is defined as 'enter' in the following example.
      </p>
      <DetailsList
        setKey="hoverSet"
        items={items}
        columns={columns}
        onRenderItemColumn={onRenderItemColumn}
        ariaLabel="Hover card DetailsList test"
      />
    </ThemeProvider>
  );
};
