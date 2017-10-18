import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { DetailsList } from './DetailsList';

const items = [
  { 'name': 'Adaute.pub', 'value': 'Adaute.pub', 'modifiedBy': 'Sit Ut', 'dateModified': '9/19/2013', 'dateModifiedValue': 1379659392209, 'fileSize': '81 KB', 'fileSizeRaw': 81 },
  { 'name': 'Addolor.xlsx', 'value': 'Addolor.xlsx', 'modifiedBy': 'Enim Ea', 'dateModified': '9/29/2014', 'dateModifiedValue': 1412038234826, 'fileSize': '51 KB', 'fileSizeRaw': 51 },
  { 'name': 'Adea.vsdx', 'value': 'Adea.vsdx', 'modifiedBy': 'Ut Laborum', 'dateModified': '4/26/2014', 'dateModifiedValue': 1398507263589, 'fileSize': '104 KB', 'fileSizeRaw': 104 }
];

const columns = [
  {
    key: 'column2',
    name: 'Name',
    fieldName: 'name',
    minWidth: 210,
    maxWidth: 350,
    isRowHeader: true,
    isSorted: true,
    isSortedDescending: false,
    data: 'string',
    isPadded: true
  },
  {
    key: 'column3',
    name: 'Date Modified',
    fieldName: 'dateModifiedValue',
    isSorted: true,
    isSortedDescending: true,
    minWidth: 70,
    maxWidth: 90,
    data: 'number',
    isPadded: true
  },
  {
    key: 'column4',
    name: 'Modified By',
    fieldName: 'modifiedBy',
    minWidth: 70,
    maxWidth: 90,
    data: 'string',
    isPadded: true
  },
  {
    key: 'column5',
    name: 'File Size',
    fieldName: 'fileSizeRaw',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    data: 'number',
  },
];

describe('DetailsList', () => {
  it('renders DetailsList correctly', () => {
    const component = renderer.create(
      <DetailsList
        items={ items }
        columns={ columns }
        isHeaderVisible={ true }
      />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});