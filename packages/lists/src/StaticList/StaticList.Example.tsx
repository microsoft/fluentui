import * as React from 'react';
import { StaticList } from './StaticList';

const ITEMS = new Array(25).fill(0);
let APPEND_EXAMPLE_ITEMS = [...ITEMS];

function appendItems(): void {
  APPEND_EXAMPLE_ITEMS = [...APPEND_EXAMPLE_ITEMS, ...new Array(10).fill(0)];
}

const StaticListExample = () => {
  return (
    <>
      <h1>Unordered-list (default)</h1>
      <StaticList items={ITEMS}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>
    </>
  );
};

const StaticOrderedListExample = () => {
  return (
    <>
      <h1>Ordered-list</h1>
      <StaticList as={'ol'} items={ITEMS}>
        {(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}
      </StaticList>
    </>
  );
};

const StaticListTableExample = () => {
  return (
    <>
      <h1>Table</h1>
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
