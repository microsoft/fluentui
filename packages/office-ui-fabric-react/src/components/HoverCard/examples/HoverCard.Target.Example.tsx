import * as React from 'react';
import { HoverCard, IExpandingCardProps, DirectionalHint } from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

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
const buildColumn = (): IColumn[] => {
  return buildColumns(items).filter(column => column.name === 'location' || column.name === 'key');
};
const columns: IColumn[] = buildColumn();
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
const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
  const [contentRendered, { toggle: toggleContentRendered }] = useBoolean(false);
  const targetElementRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
  const expandingCardProps: IExpandingCardProps = {
    onRenderCompactCard,
    onRenderExpandedCard,
    renderData: item,
    directionalHint: DirectionalHint.rightTopEdge,
    gapSpace: 16,
    calloutProps: {
      isBeakVisible: true,
    },
  };
  React.useEffect(toggleContentRendered, []);

  if (column.key === 'key') {
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
  }
  return item[column.key as keyof IExampleItem];
};

export const HoverCardTargetExample: React.FunctionComponent = () => {
  return (
    <Fabric>
      <p>
        Hover over the <i>key</i> cell of a row item to see the card or use the keyboard to navigate to it by tabbing to
        a row and hitting the right arrow key.
      </p>
      <p>
        When using the keyboard to navigate, open the card with the hotKey and it will automatically focus the first
        focusable element in the card allowing further navigation inside the card. The hotKey is defined by the hotKey
        prop and is defined as 'enter' in the following example.
      </p>
      <DetailsList
        setKey="hoverSet"
        items={items}
        columns={columns}
        onRenderItemColumn={onRenderItemColumn}
        ariaLabel="Hover card DetailsList test"
      />
    </Fabric>
  );
};
