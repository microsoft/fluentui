import * as React from 'react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

export const ReverseDomOrder = () => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow overflowDirection="start">
      {itemIds.map(i => (
        <TestOverflowItem key={i} id={i} />
      ))}
      <OverflowMenu itemIds={itemIds} />
    </Overflow>
  );
};
