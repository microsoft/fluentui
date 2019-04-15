import * as React from 'react';

interface IListDebug<T> {
  items?: T[];
  startIndex: number;
  endIndex: number;
  isVirtualized: string;
}

export const ListDebug = (props: IListDebug<any>) => {
  const { isVirtualized, startIndex, endIndex, items = [] } = props;

  return (
    <table>
      <thead>
        <tr>
          <td>
            <b>Virtualized</b>
          </td>
          <td>
            <b>Start Index</b>
          </td>
          <td>
            <b>End Index</b>
          </td>
          <td>
            <b>Visible Range</b>
          </td>
          <td>
            <b>Total Item Count</b>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{isVirtualized}</td>
          <td>{startIndex}</td>
          <td>{endIndex}</td>
          <td>{endIndex - startIndex}</td>
          <td>{items.length}</td>
        </tr>
      </tbody>
    </table>
  );
};
