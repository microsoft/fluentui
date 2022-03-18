import * as React from 'react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

export const MinimumVisible = () => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow minimumVisible={4}>
      {itemIds.map(i => (
        <TestOverflowItem key={i} id={i} />
      ))}
      <OverflowMenu itemIds={itemIds} />
    </Overflow>
  );
};
