import * as React from 'react';
import { StaticList } from './StaticList';

/* tslint:disable-next-line:no-any */
const Profiler = (React as any).unstable_Profiler;

const ITEMS = new Array(25).fill(0);
let APPEND_EXAMPLE_ITEMS = [...ITEMS];

function appendItems(): void {
  APPEND_EXAMPLE_ITEMS = [...APPEND_EXAMPLE_ITEMS, ...new Array(10).fill(0)];
}

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
            return <li key={index}>{`Item #${index}`}</li>;
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
      <Profiler id={'StaticList-Ordered'} onRender={LOG_PROFILER_RENDER}>
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
      <Profiler id={'StaticList-Table'} onRender={LOG_PROFILER_RENDER}>
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

const StaticListAppendItemsExample = () => {
  return (
    <>
      <h1>Append items example</h1>
      <button value="Append" onClick={appendItems}>
        Append item
      </button>
      <StaticList items={APPEND_EXAMPLE_ITEMS}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>
    </>
  );
};

export { StaticListExample, StaticOrderedListExample, StaticListAppendItemsExample, StaticListTableExample };
