import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  CheckboxVisibility,
  SelectionMode,
} from '@fluentui/react';

const items = [
  {
    name: 'Adaute.pub',
    value: 'Adaute.pub',
    modifiedBy: 'Sit Ut',
    dateModified: '9/19/2013',
    dateModifiedValue: 1379659392209,
    fileSize: '81 KB',
    fileSizeRaw: 81,
  },
  {
    name: 'Addolor.xlsx',
    value: 'Addolor.xlsx',
    modifiedBy: 'Enim Ea',
    dateModified: '9/29/2014',
    dateModifiedValue: 1412038234826,
    fileSize: '51 KB',
    fileSizeRaw: 51,
  },
  {
    name: 'Adea.vsdx',
    value: 'Adea.vsdx',
    modifiedBy: 'Ut Laborum',
    dateModified: '4/26/2014',
    dateModifiedValue: 1398507263589,
    fileSize: '104 KB',
    fileSizeRaw: 104,
  },
  {
    name: 'Adipiscingaute.xls',
    value: 'Adipiscingaute.xls',
    modifiedBy: 'Enim Ut',
    dateModified: '12/27/2012',
    dateModifiedValue: 1356675117937,
    fileSize: '68 KB',
    fileSizeRaw: 68,
  },
  {
    name: 'Adipiscingculpa.vstx',
    value: 'Adipiscingculpa.vstx',
    modifiedBy: 'Nulla In',
    dateModified: '8/7/2013',
    dateModifiedValue: 1375931283178,
    fileSize: '61 KB',
    fileSizeRaw: 61,
  },
  {
    name: 'Adipiscingelit.one',
    value: 'Adipiscingelit.one',
    modifiedBy: 'Lorem Eiusmod',
    dateModified: '9/18/2013',
    dateModifiedValue: 1379536560338,
    fileSize: '41 KB',
    fileSizeRaw: 41,
  },
];

const columns: IColumn[] = [
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
    isPadded: true,
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
    isPadded: true,
  },
  {
    key: 'column4',
    name: 'Modified By',
    fieldName: 'modifiedBy',
    minWidth: 70,
    maxWidth: 90,
    data: 'string',
    isPadded: true,
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

const groups = [
  { count: 2, key: '1', name: 'Red', startIndex: 0 },
  { count: 4, key: '2', name: 'Blue', startIndex: 2 },
];

storiesOf('DetailsList', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DetailsRow')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-DetailsRow')
        .hover('.ms-DetailsRow')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => (
    <DetailsList
      items={items}
      compact={false}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
    />
  ))
  .addStory('Compact', () => (
    <DetailsList
      items={items}
      compact
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
    />
  ))
  .addStory('Single Selection Mode', () => (
    <DetailsList
      items={items}
      compact={false}
      columns={columns}
      selectionMode={SelectionMode.single}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
    />
  ))
  .addStory('Grouped', () => (
    <DetailsList
      items={items}
      groups={groups}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
    />
  ))
  .addStory('Grouped with Checkbox Hidden', () => (
    <DetailsList
      items={items}
      groups={groups}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      checkboxVisibility={CheckboxVisibility.hidden}
      isHeaderVisible={true}
    />
  ))
  .addStory(
    'Checkbox Visible Always',
    () => (
      <DetailsList
        items={items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        checkboxVisibility={CheckboxVisibility.always}
        isHeaderVisible={true}
      />
    ),
    { includeRtl: true },
  );
