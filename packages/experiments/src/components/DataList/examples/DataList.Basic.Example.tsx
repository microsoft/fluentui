import * as React from 'react';
import { } from 'react-addons-perf';
import { DataList, IColumn } from '../DataList';
import { IItem } from '../List';

interface IListItem extends IItem {
  name: string;
  position: string;
  office: string;
  index: number;
}

// const items: IListItem[] = [];
// for (let i = 0; i < 300; ++i) {
//   items.push({
//     key: `item-${i}`,

//     column1: `Item ${i} c1`,
//     column2: `Item ${i} c2`,
//   });
// }

const positions = ['Accountant', 'Developer', 'Administrative Assistant', 'Vice President', 'Technical Fellow', 'Development Manager', 'Designer', 'Program Manager'];

const offices = ['Seattle', 'New York', 'Tokyo', 'California'];

function randWord(words: string[]) {
  return words[Math.floor(Math.random() * words.length)];
}

const items: IListItem[] = [];

for (let i = 0; i < 100; i++) {
  items.push({
    key: 'item' + i,
    name: 'Item ' + i,
    position: randWord(positions),
    office: randWord(offices),
    index: i
  });
}

export class DataListBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        {
          React.createElement(
            DataList as any,
            {
              isVirtualized: true,
              items,
              itemHeight: 30,
              columns: [
                {
                  key: 'name',
                  name: 'Name',
                  fieldName: 'name',
                  minWidth: 200,
                  maxWidth: 300,
                  isResizable: true
                },
                {
                  key: 'position',
                  name: 'Position',
                  fieldName: 'position',
                  minWidth: 150,
                  maxWidth: 300,
                  isResizable: true
                },
                {
                  key: 'office',
                  name: 'Office',
                  fieldName: 'office',
                  minWidth: 100,
                  maxWidth: 300,
                  isCollapsable: true,
                  isResizable: true
                },
              ] as IColumn[]
            })
        }
      </div>
    );
  }
}
