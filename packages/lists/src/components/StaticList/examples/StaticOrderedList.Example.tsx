import * as React from 'react';
import { StaticList } from '../StaticList';

/* tslint:disable-next-line:no-any */
const Profiler = (React as any).unstable_Profiler;

function generateItems(count: number): number[] {
  const itemsArray: number[] = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(i);
  }
  return itemsArray;
}

const ITEMS: ReadonlyArray<number> = generateItems(25);

function logProfilerRender(id: string, phase: string, actualTime: number, baseTime: number, startTime: number, commitTime: number): void {
  console.table({ id, phase, actualTime, baseTime, startTime, commitTime });
}

const StaticOrderedListExample = () => {
  return (
    <>
      <Profiler id={'StaticList-Ordered'} onRender={logProfilerRender}>
        <StaticList as={'ol'} items={ITEMS}>
          {(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}
        </StaticList>
      </Profiler>
    </>
  );
};

export { StaticOrderedListExample };
