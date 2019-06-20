import * as React from 'react';
import { StaticList } from './StaticList';

const Profiler = React.unstable_Profiler;

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

const StaticListExample = () => {
  return (
    <>
      <h1>Unordered-list (default)</h1>
      <Profiler id={'StaticList-Basic'} onRender={logProfilerRender}>
        <StaticList items={ITEMS}>
          {(_item: number, index: number) => {
            return (
              <Profiler id={'StaticList-Ordered-row'} onRender={logProfilerRender}>
                <li key={index}>{`Item #${index}`}</li>
              </Profiler>
            );
          }}
        </StaticList>
      </Profiler>
    </>
  );
};

const StaticOrderedListExample = () => {
  return (
    <>
      <h1>Ordered-list</h1>
      <Profiler id={'StaticList-Ordered'} onRender={logProfilerRender}>
        <StaticList as={'ol'} items={ITEMS}>
          {(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}
        </StaticList>
      </Profiler>
    </>
  );
};

const StaticListTableExample = () => {
  return (
    <>
      <h1>Table</h1>
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

export { StaticListExample, StaticOrderedListExample, StaticListTableExample };
