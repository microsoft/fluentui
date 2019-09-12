import * as React from 'react';
import { StaticList } from '@uifabric/lists';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

function generateItems(count: number): number[] {
  const itemsArray: number[] = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(i);
  }
  return itemsArray;
}

const ITEMS: ReadonlyArray<number> = generateItems(25);

const tableClassName = mergeStyles({
  borderCollapse: 'collapse',
  selectors: {
    '&, th, td': {
      border: '1px solid black'
    }
  }
});

export const StaticListTableExample = () => {
  return (
    <table className={tableClassName}>
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
  );
};
