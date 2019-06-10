import * as React from 'react';
import { StaticList } from './StaticList';

const ITEMS = new Array(25).fill(0);

const StaticListExample = () => {
  return <StaticList items={ITEMS}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>;
};

let APPEND_EXAMPLE_ITEMS = [...ITEMS];

function appendItems(): void {
  APPEND_EXAMPLE_ITEMS = [...APPEND_EXAMPLE_ITEMS, ...new Array(10).fill(0)];
}

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

const StaticListTableExample = () => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Item</th>
        </tr>
      </thead>
      <StaticList as="tbody" items={ITEMS}>
        {(_item: number, index: number) => (
          <tr key={index}>
            <td>{`Item #${index}`}</td>
          </tr>
        )}
      </StaticList>
      <tfoot>
        <tr>
          <td>{`Total count: ${ITEMS.length}`}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export { StaticListExample, StaticListAppendItemsExample, StaticListTableExample };
