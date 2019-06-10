import * as React from 'react';
import { StaticList } from './StaticList';

const ITEMS = new Array(25).fill(0);

const StaticListExample = () => {
  return <StaticList items={ITEMS}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>;
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
          <tr>
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

export { StaticListExample, StaticListTableExample };
