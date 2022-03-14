import * as React from 'react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowItem } from './utils.stories';

export const CustomPriorities = () => {
  const priorities = [2, 3, 6, 1, 4, 5, 0, 7];

  return (
    <Overflow>
      {priorities.map(i => (
        <TestOverflowItem key={i} id={i.toString()} priority={i} />
      ))}
      <OverflowMenu itemIds={priorities.map(x => x.toString())} />
    </Overflow>
  );
};
