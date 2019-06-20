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

const StaticListTableExample = () => {
  return (
    <>
      <Profiler id={'StaticList-Table'} onRender={logProfilerRender}>
        <table border="1">
          <thead>
            <tr>
              <th>Type</th>
              <th>#</th>
            </tr>
          </thead>
          <StaticList as="tbody" items={ITEMS}>
            {(_item: number, index: number) => (
              <tr key={index}>
                <td>{'Item'}</td>
                <td>{index}</td>
              </tr>
            )}
          </StaticList>
          <tfoot>
            <tr>
              <td>{'Total count'}</td>
              <td>{ITEMS.length}</td>
            </tr>
          </tfoot>
        </table>
      </Profiler>
    </>
  );
};

export { StaticListTableExample };
