import * as React from 'react';
import { StaticList } from '@uifabric/lists';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

function generateItems(count: number): number[] {
  const itemsArray: number[] = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(i);
  }
  return itemsArray;
}

const ITEMS: ReadonlyArray<number> = generateItems(25);

const listClassName = mergeStyles({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  borderLeft: '3px solid #0078d4',
  selectors: {
    li: {
      background: '#ffffff',
      height: 25,
      lineHeight: 25,
      paddingLeft: 27
    },
    'li:nth-child(even)': {
      background: '#f3f2f1',
      height: 50,
      lineHeight: 50
    }
  }
});

export const StaticOrderedListExample = () => {
  return (
    <StaticList as={'ol'} items={ITEMS} className={listClassName}>
      {(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}
    </StaticList>
  );
};
