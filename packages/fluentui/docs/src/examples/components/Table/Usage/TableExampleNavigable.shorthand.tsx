import { Table, Button, Flex, MenuButton } from '@fluentui/react-northstar';
import {
  gridNestedBehavior,
  gridCellWithFocusableElementBehavior,
  gridCellMultipleFocusableBehavior,
} from '@fluentui/accessibility';
import * as React from 'react';
import { MoreIcon } from '@fluentui/react-icons-northstar';

function handleRowClick(index) {
  alert(`OnClick on the row ${index} executed.`);
}

const header = {
  key: 'header',
  items: [
    { content: 'id', key: 'id' },
    { content: 'Name', key: 'name' },
    { content: 'Picture', key: 'pic' },
    { content: 'Age', key: 'action' },
    { content: 'Tags', key: 'tags' },
    { key: 'more options', 'aria-label': 'options' },
  ],
};

const moreOptionCell = {
  content: <Button tabIndex={-1} icon={<MoreIcon />} circular text iconOnly title="More options" />,
  truncateContent: true,
  accessibility: gridCellWithFocusableElementBehavior,
  onClick: e => {
    alert('more option button clicked');
    e.stopPropagation();
  },
};

const moreActionCell = {
  content: (
    <Flex gap="gap.small" vAlign="center">
      <Button size="small" content="tag 1" />
      <Button size="small" content="tag 2" />
      {/* table layout not support now more content in the cell */}
      {/* <Button tabIndex={-1} icon="edit" circular text iconOnly title="edit tags" /> */}
    </Flex>
  ),
  accessibility: gridCellMultipleFocusableBehavior,
};

const contextMenuItems = ['Add to selection', 'Remove', 'Download'];

const rowsPlain = [
  {
    key: 1,
    items: [
      { content: '1', key: '1-1' },
      { content: 'Roman van von der Longername', key: '1-2', id: 'name-1' },
      { content: 'None', key: '1-3' },
      { content: '30 years', key: '1-4', id: 'age-1' },
      { key: '1-5', ...moreActionCell },
      { key: '1-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(1),
    'aria-labelledby': 'name-1 age-1',
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
  {
    key: 2,
    items: [
      { content: '2', key: '2-1' },
      { content: 'Alex', key: '2-2' },
      { content: 'None', key: '2-3' },
      { content: '1 year', key: '2-4' },
      { key: '2-5', ...moreActionCell },
      { key: '2-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(2),
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
  {
    key: 3,
    items: [
      { content: '3', key: '3-1' },
      { content: 'Ali', key: '3-2' },
      { content: 'None', key: '3-3' },
      { content: '30000000000000 years', truncateContent: true, key: '3-4' },
      { key: '3-5' },
      { key: '3-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(3),
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
];

const StaticTable = () => (
  <Table
    variables={{ cellContentOverflow: 'none' }}
    header={header}
    rows={rowsPlain}
    aria-label="Nested navigation"
    accessibility={gridNestedBehavior}
  />
);

export default StaticTable;
