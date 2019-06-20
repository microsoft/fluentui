import * as React from 'react';
import { StaticList } from '../StaticList';

function generateItems(count: number): number[] {
  const itemsArray: number[] = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(i);
  }
  return itemsArray;
}

const ITEMS: ReadonlyArray<number> = generateItems(25);

const StaticListExample = () => {
  return <StaticList items={ITEMS}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>;
};

export { StaticListExample };
